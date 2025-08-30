using Azure.Core;
using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.Dtos;
using GameStoreAPI.Features.Games.Dtos.GetGame;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace GameStoreAPI.Features.Games.GamesService
{
    public class IGDBService : IIGDBService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;


        private string _accessToken = null;
        private DateTime _tokenExpiration = DateTime.UtcNow;

        public IGDBService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }
        

        private async Task<string> GetValidApiToken()
        {
            if (!string.IsNullOrEmpty(_accessToken) && _tokenExpiration > DateTime.UtcNow.AddMinutes(3))
            {
                return _accessToken;
            }

            var httpClient = _httpClientFactory.CreateClient(); 

            var authUrl = _configuration["IGDB:AuthUrl"];
            var clientId = _configuration["IGDB:ClientId"];
            var clientSecret = _configuration["IGDB:ClientSecret"];

            var requestBody = new Dictionary<string, string>
            {
                { "client_id", clientId },
                { "client_secret", clientSecret },
                { "grant_type", "client_credentials" }
            };

            var response = await httpClient.PostAsync(authUrl, new FormUrlEncodedContent(requestBody));

            if (!response.IsSuccessStatusCode)
            {
                throw new ApplicationException("It was not able to authenticate with IGDB API");
            }

            var authResponse = await response.Content.ReadFromJsonAsync<IGDBAuthResponseDto>();

            if (authResponse?.AccessToken == null)
            {
                throw new ApplicationException("IGDB response didnt contain API access token.");
            }

            _accessToken = authResponse.AccessToken;
            _tokenExpiration = DateTime.UtcNow.AddSeconds(authResponse.ExpiresIn);

            return _accessToken;
        }


        private async Task<List<GameDetailsResponseIGDBDto>?> ExecuteIgdbQueryAsync( string query)
        {
            string? token = await GetValidApiToken();

       
            var httpClient = _httpClientFactory.CreateClient("IGDB");
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Client-ID", _configuration["IGDB:ClientId"]);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

            var response = await httpClient.PostAsync("games", new StringContent(query, Encoding.UTF8, "text/plain"));

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            var content = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<GameDetailsResponseIGDBDto>>(content);
        }

        public async Task<GameDetailsResponseIGDBDto?> GetGameByIdAsync(int igdbId)
        {
            var query = $"fields name, platforms.name, screenshots.image_id, cover.image_id, first_release_date, summary, videos.video_id, genres.name,  " +
                $"involved_companies.company.name, involved_companies.developer, involved_companies.publisher, game_modes.name; where id = {igdbId};";
            var gamesList = await ExecuteIgdbQueryAsync(query);
            return gamesList?.FirstOrDefault();
        }

        public async Task<List<GameDetailsResponseIGDBDto>> GetGamesAsync(GetGamesRequestDto parameters)
        {
            var queryBuilder = new StringBuilder();

            var fields = parameters.Detailed
                ? "name, platforms.name, screenshots.image_id, cover.image_id, first_release_date, summary, aggregated_rating, genres.name"
                : "name, cover.image_id";
            queryBuilder.Append($"fields {fields}; ");

            if (!string.IsNullOrWhiteSpace(parameters.Search))
            {
                queryBuilder.Append($"search \"{parameters.Search}\"; ");
            }
            else
            { 
                var sortByClause = parameters.SortBy?.ToLower() switch
                {
                    "rating" => "sort aggregated_rating desc; ",
                    "release_date" => "sort first_release_date desc; ",
                    "name" => "sort name asc; ",
                    _ => "sort aggregated_rating desc; "
                };
                queryBuilder.Append(sortByClause);
            }

                var whereClauses = new List<string> { "cover != null", "game_type = 0" };

            if (parameters.YearFrom.HasValue)
            {
                var startOfYear = new DateTimeOffset(parameters.YearFrom.Value, 1, 1, 0, 0, 0, TimeSpan.Zero).ToUnixTimeSeconds();
                whereClauses.Add($"first_release_date >= {startOfYear}");
            }
            if (parameters.YearTo.HasValue)
            {
                var endOfYear = new DateTimeOffset(parameters.YearTo.Value, 12, 31, 23, 59, 59, TimeSpan.Zero).ToUnixTimeSeconds();
                whereClauses.Add($"first_release_date <= {endOfYear}");
            }

            if (!string.IsNullOrWhiteSpace(parameters.Genre))
            {
                whereClauses.Add($"genres.name = \"{parameters.Genre}\"");
            }

            if (!string.IsNullOrWhiteSpace(parameters.Rating))
            {
                whereClauses.Add($"rating >= {parameters.Rating}");
            }


            if (whereClauses.Any())
            {
                queryBuilder.Append($"where {string.Join(" & ", whereClauses)}; ");
            }


            if (parameters.Limit.HasValue && parameters.Limit > 0)
            {
                queryBuilder.Append($"limit {parameters.Limit};");
            }
            else
            {
                var offset = (parameters.Page - 1) * parameters.PageSize;
                queryBuilder.Append($"limit {parameters.PageSize}; offset {offset};");
            }

            var query = queryBuilder.ToString();
            var result = await ExecuteIgdbQueryAsync(query);
            return result ?? new List<GameDetailsResponseIGDBDto>();
        }



    }
}

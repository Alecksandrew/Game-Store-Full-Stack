using Azure.Core;
using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.Dtos;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Models;
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
        private readonly AppDbContext _dbContext;
        private readonly IIGDBService _igdbService;

        private string _accessToken = null;
        private DateTime _tokenExpiration = DateTime.UtcNow;

        public IGDBService(IHttpClientFactory httpClientFactory, IConfiguration configuration, AppDbContext context, IIGDBService igdbService)
        {
            _dbContext = context;
            _igdbService = igdbService;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }
        

        public async Task<string> GetValidApiToken()
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

        

        public async Task<GameDetailsResponseIGDBDto?> GetGameByIdAsync(int igdbId)
        {
            var token = await GetValidApiToken();

            var httpClient = _httpClientFactory.CreateClient("IGDB");

            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Client-ID", _configuration["IGDB:ClientId"]);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var query = $"fields name, platforms.name, screenshots.image_id, cover.image_id, first_release_date, game_type, genres.name, language_supports, summary, videos.video_id; where id = {igdbId};";

            var response = await httpClient.PostAsync("games", new StringContent(query, Encoding.UTF8, "text/plain"));

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();

            var gamesList = JsonSerializer.Deserialize<List<GameDetailsResponseIGDBDto>>(content);

            return gamesList?.FirstOrDefault();
        }
    }
}

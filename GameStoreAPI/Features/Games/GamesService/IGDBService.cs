using Azure.Core;
using GameStoreAPI.Features.Games.Dtos;
using System.Net.Http;

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
    }
}

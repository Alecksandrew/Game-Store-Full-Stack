using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Models;

namespace GameStoreAPI.Features.Games.GamesService
{
    public interface IIGDBService
    {
        Task<string> GetValidApiToken();
        Task<GameDetailsResponseIGDBDto?> GetGameByIdAsync(int igdbId);
        public Task<List<GameDetailsResponseIGDBDto>> GetPopularGamesAsync(int amount);
        public Task<List<GameDetailsResponseIGDBDto>> GetPopularGamesSummaryAsync(int amount);


    }
}

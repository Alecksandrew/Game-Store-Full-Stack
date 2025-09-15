using GameStoreAPI.Features.Games.Dtos.GetGame;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Models;

namespace GameStoreAPI.Features.Games.GamesService
{
    public interface IIGDBService
    {
        Task<GameDetailsResponseIGDBDto?> GetGameByIdAsync(int igdbId);
        Task<List<GameDetailsResponseIGDBDto>> GetGamesAsync(GetGamesRequestDto parameters);

        public Task<List<GameDetailsResponseIGDBDto>> GetGamesByIdsAsync(IEnumerable<int> ids);
    }


}


using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Features.Games.Dtos.GetGameSummary;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;

namespace GameStoreAPI.Features.Games.GamesService
{

    public interface IGameService
    {
        public Task<Result<List<GameDetailsResponseDto>>> GetPopularGamesAsync(int amount);
        public Task<Result<List<GameSummaryResponseDto>>> GetPopularGamesSummaryAsync(int page, int pageSize);
        public Task<Result<GameDetailsResponseDto>> GetGameDetailsAsync(int igdbId);
    }
}

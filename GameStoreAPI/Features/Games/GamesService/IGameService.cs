using GameStoreAPI.Features.Games.Dtos.GetGame;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Features.Games.Dtos.GetGameSummary;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;

namespace GameStoreAPI.Features.Games.GamesService
{

    public interface IGameService
    {
        public Task<Result<GameDetailsResponseDto>> GetGameDetailsAsync(int igdbId);
        Task<Result<object>> GetGamesAsync(GetGamesRequestDto parameters);
    }
}

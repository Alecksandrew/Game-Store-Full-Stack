using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;

namespace GameStoreAPI.Features.Games.GamesService
{

    public interface IGameService
    {
        public Task<Result<GameDetailsResponseDto>> GetGameDetailsAsync(int igdbId);
    }
}

using GameStoreAPI.Features.Admin.Dtos;
using GameStoreAPI.Features.Admin.Dtos.AddKeys;
using GameStoreAPI.Features.Admin.Dtos.UpdatePrice;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;
using GameStoreAPI.Shared.Dtos;

namespace GameStoreAPI.Features.Admin.AdminService
{
    public interface IAdminService
    {
        Task<Result<PaginatedResponseDto<AdminResponseDto>>> GetGamesInventoryAsync(int page, int pageSize, string? search = null, string? sortBy = null, bool ascending = true);
        Task<Result<GameInventory>> UpdateGamePriceAsync(int igdbId, UpdatePriceRequestDto dto);
        Task<Result<GameInventory>> AddGameKeysAsync(int igdbId, AddKeysRequestDto dto);
        Task<Result<object>> DeleteGameAsync(int igdbId);
    }
}

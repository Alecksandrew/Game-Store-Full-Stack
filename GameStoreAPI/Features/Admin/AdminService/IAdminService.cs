using GameStoreAPI.Features.Admin.Dtos.AddKeys;
using GameStoreAPI.Features.Admin.Dtos.UpdatePrice;
using GameStoreAPI.Models;

namespace GameStoreAPI.Features.Admin.AdminService
{
    public interface IAdminService
    {
        Task<IEnumerable<GameInventory>> GetAllGamesInventoryAsync();
        Task<bool> UpdateGamePriceAsync(int igdbId, UpdatePriceRequestDto dto);
        Task<bool> AddGameKeysAsync(int igdbId, AddKeysRequestDto dto);
        Task<bool> DeleteGameInventoryAsync(int igdbId);
    }
}

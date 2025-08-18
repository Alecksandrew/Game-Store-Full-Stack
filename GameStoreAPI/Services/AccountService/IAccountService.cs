using GameStoreAPI.Dtos.GetAccount;
using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Services.AccountService
{
    public interface IAccountService
    {
        Task<(bool success, string message, IEnumerable<IdentityError>? errors)> DeleteAccountAsync(string userId);
        Task<(bool success, string userName, string email)?> GetAccountAsync(string userId);
    }
}


using GameStoreAPI.Features.MyAccount.Dtos.UpdateAccount;
using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.MyAccount.AccountService
{
    public interface IAccountService
    {
        Task<(bool success, string message, IEnumerable<IdentityError>? errors)> DeleteAccountAsync(string userId);
        Task<(bool success, string? userName, string? email)> GetAccountAsync(string userId);
        Task<(bool success, string message, IEnumerable<IdentityError>? errors)> UpdatePasswordAsync(string userId, UpdatePasswordRequestDto dto);
    }
}


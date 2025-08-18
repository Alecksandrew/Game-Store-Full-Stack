using GameStoreAPI.Dtos.GetAccount;
using GameStoreAPI.Dtos.UpdateAccount;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AccountService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<(bool success, string? userName, string? email)> GetAccountAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return (false, null, null);

            return (true, user.UserName, user.Email);
        }

        public async Task<(bool success, string message, IEnumerable<IdentityError>? errors)> UpdatePasswordAsync(string userId, UpdatePasswordRequestDto dto)
        {

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return (false, "User not found", null);

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);

            return result.Succeeded ? (true, "Your password was updated", null) : (false, "Problem when trying to update password", result.Errors);
        }


        public async Task<(bool success, string message, IEnumerable<IdentityError>? errors)> DeleteAccountAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return (true, "Account already deleted or not found", null);

            var result = await _userManager.DeleteAsync(user);

            return (
            result.Succeeded 
            ? (true, "Your account has been deleted successfully", null) 
            : (false, "Error when deleting account.", result.Errors)
            );
        }
    }
}

using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AccountService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
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

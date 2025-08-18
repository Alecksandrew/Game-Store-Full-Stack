using GameStoreAPI.Data;
using GameStoreAPI.Dtos.DeleteAccount;
using GameStoreAPI.Services.AccountService;
using GameStoreAPI.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameStoreAPI.Controllers
{
    [ApiController]
    [Route("api/account/me")]
    public class MyAccountController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AccountService _accountService;

        public MyAccountController(AppDbContext dbContext, UserManager<IdentityUser> userManager, AccountService accountService)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _accountService = accountService;
        }


        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteAccount()
        {
            DeleteAccountResponseDto response = new DeleteAccountResponseDto
            {
                message = "",
                errors = null,
            };

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                response.message = "Invalid token";
                return Unauthorized(response);
            }

            var (success, message, errors) = await _accountService.DeleteAccountAsync(userId);

            response.message = message;
            response.errors = errors;
            return success ? Ok(response) : BadRequest(response);
        }

    }
}

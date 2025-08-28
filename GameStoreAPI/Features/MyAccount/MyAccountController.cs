using GameStoreAPI.Data;
using GameStoreAPI.Features.MyAccount.AccountService;
using GameStoreAPI.Features.MyAccount.Dtos.DeleteAccount;
using GameStoreAPI.Features.MyAccount.Dtos.GetAccount;
using GameStoreAPI.Features.MyAccount.Dtos.UpdateAccount;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameStoreAPI.Features.MyAccount
{
    [ApiController]
    [Route("api/account/me")]
    public class MyAccountController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAccountService _accountService;

        public MyAccountController(AppDbContext dbContext, UserManager<IdentityUser> userManager, IAccountService accountService)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _accountService = accountService;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAccount()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var (success, userName, email) = await _accountService.GetAccountAsync(userId);

            GetAccountResponseDto response = new GetAccountResponseDto
            {
                userName = userName,
                email = email,
            };
            return success ? Ok(response) : NotFound(response);
        }


        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordRequestDto req)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var (success, message, errors) = await _accountService.UpdatePasswordAsync(userId, req);

            UpdatePasswordResponseDto response = new UpdatePasswordResponseDto
            {
                message = message,
                errors = errors
            };

            return success ? Ok(response) :BadRequest(response);
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

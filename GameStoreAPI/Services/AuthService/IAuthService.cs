using GameStoreAPI.Dtos;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GameStoreAPI.Services.AuthService
{
    public interface IAuthService
    {
        Task<string> GenerateJwtToken(IdentityUser user);
        RefreshToken GenerateRefreshToken(string userId);
        Task<(bool success, string message, IEnumerable<IdentityError>? errors)> RegisterAccountAsync(RegisterAccountRequestDto req);
        Task<(bool Success, string Message, string? JwtToken, string? RefreshToken)> LoginAccountAsync(LoginAccountResquestDto req);
        Task<IActionResult> RefreshToken(string refreshTokenReq);
        Task<IActionResult> LogoutAccount(string userId, string jti, string expClaim);
        Task<IActionResult> ConfirmEmail(string emailToken, string userId);
    }
}

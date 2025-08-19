using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Dtos.LoginAccount;
using GameStoreAPI.Dtos.ResetPassword;
using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Services.AuthService
{
    public interface IAuthService
    {
        Task<(bool success, string message, IEnumerable<IdentityError>? errors)> RegisterAccountAsync(RegisterAccountRequestDto req);
        Task<(bool Success, string Message, string? JwtToken, string? RefreshToken)> LoginAccountAsync(LoginAccountResquestDto req);
        Task<(bool Success, string Message, string? JwtToken, string? RefreshToken)> RefreshTokenAsync(string refreshTokenReq);
        Task<(bool success, string message)> LogoutAccountAsync(string userId, string jti, string expClaim);
        Task<(EmailConfirmationStatus status, IEnumerable<IdentityError>? errors)> ConfirmEmailAsync(string userId, string emailToken);
        Task<string> ForgotPasswordAsync(string email);
        Task<(bool success, string message, IEnumerable<IdentityError>? errors)> ResetPasswordAsync(ResetPasswordRequestDto dto);
    }
}

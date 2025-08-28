using GameStoreAPI.Features.Authentication.Dtos.LoginAccount;
using GameStoreAPI.Features.Authentication.Dtos.RegisterAccount;
using GameStoreAPI.Features.Authentication.Dtos.ResetPassword;
using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.Authentication.AuthService
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

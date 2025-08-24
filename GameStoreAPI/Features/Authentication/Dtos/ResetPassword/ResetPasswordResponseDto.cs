using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.Authentication.Dtos.ResetPassword
{
    public class ResetPasswordResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

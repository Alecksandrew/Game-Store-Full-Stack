using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Dtos.ResetPassword
{
    public class ResetPasswordResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

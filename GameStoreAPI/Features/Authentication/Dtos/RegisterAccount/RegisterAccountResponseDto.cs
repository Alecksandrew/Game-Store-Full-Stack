using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.Authentication.Dtos.RegisterAccount
{
    public class RegisterAccountResponseDto
    {
        public required string Message { get; set; }
        public IEnumerable<IdentityError>? Errors { get; set; }
    }
}

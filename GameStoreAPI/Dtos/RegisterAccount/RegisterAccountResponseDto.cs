using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Dtos.CreateAccount
{
    public class RegisterAccountResponseDto
    {
        public required string Message { get; set; }
        public IEnumerable<IdentityError>? Errors { get; set; }
    }
}

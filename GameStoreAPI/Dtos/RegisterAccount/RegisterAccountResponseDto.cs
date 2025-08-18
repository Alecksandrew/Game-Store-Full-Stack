using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Dtos.CreateAccount
{
    public class RegisterAccountResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.Authentication.Dtos.ConfirmEmail
{
    public class ConfirmEmailResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

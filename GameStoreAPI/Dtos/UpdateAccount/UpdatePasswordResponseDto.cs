using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Dtos.UpdateAccount
{
    public class UpdatePasswordResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

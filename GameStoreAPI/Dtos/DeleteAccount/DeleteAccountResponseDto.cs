using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Dtos.DeleteAccount
{
    public class DeleteAccountResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

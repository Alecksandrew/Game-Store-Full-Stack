using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.MyAccount.Dtos.DeleteAccount
{
    public class DeleteAccountResponseDto
    {
        public required string message;
        public IEnumerable<IdentityError>? errors;
    }
}

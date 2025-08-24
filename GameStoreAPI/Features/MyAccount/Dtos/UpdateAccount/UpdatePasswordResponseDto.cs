using Microsoft.AspNetCore.Identity;

namespace GameStoreAPI.Features.MyAccount.Dtos.UpdateAccount
{
    public class UpdatePasswordResponseDto
    {
        public required string message { get; set; }
        public IEnumerable<IdentityError>? errors { get; set; }
    }
}

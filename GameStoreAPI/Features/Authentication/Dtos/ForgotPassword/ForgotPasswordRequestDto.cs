using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Authentication.Dtos.ForgotPassword
{
    public class ForgotPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Dtos.ForgotPassword
{
    public class ForgotPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
    }
}

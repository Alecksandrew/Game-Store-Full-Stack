using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Dtos.ResetPassword
{
    public class ResetPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        public required string Token { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Password must contains 8 characters at least.")]
        public required string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public required string ConfirmNewPassword { get; set; }
    }
}

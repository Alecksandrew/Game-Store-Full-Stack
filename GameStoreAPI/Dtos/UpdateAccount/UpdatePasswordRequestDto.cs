using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Dtos.UpdateAccount
{
    public class UpdatePasswordRequestDto
    {
        [Required]
        public required string CurrentPassword { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "New password must contain 8 characters at least.")]
        public required string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword", ErrorMessage = "New password and confirm new password must be the same.")]
        public required string ConfirmNewPassword { get; set; }
    }
}

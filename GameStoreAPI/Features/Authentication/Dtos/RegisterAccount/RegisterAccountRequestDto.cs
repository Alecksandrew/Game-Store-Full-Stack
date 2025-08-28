using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Authentication.Dtos.RegisterAccount
{
    public class RegisterAccountRequestDto
    {
        [Required]
        public string Username { get; init; }

        [Required]
        [EmailAddress]
        public string Email { get; init; }

        [Required]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Your password must contain between 8 and 50 characters.")]
        public string Password { get; init; }

        [Required]
        [Compare("Password", ErrorMessage = "Password must be the same!")]
        public string ConfirmPassword { get; init; }

    }
}

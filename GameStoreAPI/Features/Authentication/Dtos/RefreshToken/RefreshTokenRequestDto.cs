using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Authentication.Dtos.RefreshToken
{
    public class RefreshTokenRequestDto
    {
        [Required]
        public required string refreshTokenReq;
    }
}

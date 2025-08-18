using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Dtos.RefreshToken
{
    public class RefreshTokenRequestDto
    {
        [Required]
        public required string refreshTokenReq;
    }
}

using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Dtos.RefreshToken
{
    public class RefreshTokenResponseDto
    {
        public string? message;
        public string? refreshTokenRes;
        public string? jwtTokenRes;
    }
}

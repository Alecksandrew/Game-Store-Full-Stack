namespace GameStoreAPI.Dtos.LoginAccount
{
    public class LoginAccountResponseDto
    {
        public string? message { get; set; }
        public string? refreshTokenRes { get; set; }
        public string? jwtTokenRes { get; set; }
    }
}

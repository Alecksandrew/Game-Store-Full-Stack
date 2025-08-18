namespace GameStoreAPI.Services.AuthService
{
    public enum EmailConfirmationStatus
    {
        Success,
        UserNotFound,
        InvalidToken,
        Failure
    }
}

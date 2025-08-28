namespace GameStoreAPI.Features.Authentication.AuthService
{
    public enum EmailConfirmationStatus
    {
        Success,
        UserNotFound,
        InvalidToken,
        Failure
    }
}

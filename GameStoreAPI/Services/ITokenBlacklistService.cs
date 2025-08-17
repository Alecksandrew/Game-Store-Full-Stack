namespace GameStoreAPI.Services
{
    public interface ITokenBlacklistService
    {
        Task BlacklistTokenAsync(string jti, DateTime expiryTime);
        Task<bool> IsTokenBlacklistedAsync(string jti);
    }
}

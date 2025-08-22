using Microsoft.Extensions.Caching.Memory;

namespace GameStoreAPI.Services
{
    public class MemoryCacheTokenBlacklistService : ITokenBlacklistService
    {

        private readonly IMemoryCache _memoryCache;

        public MemoryCacheTokenBlacklistService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public Task BlacklistTokenAsync(string jti, DateTime expiryTime)
        {
            var cacheExpiry = expiryTime.Subtract(DateTime.UtcNow);
            
            if (cacheExpiry > TimeSpan.Zero)
            {
                _memoryCache.Set(jti, "revoked", cacheExpiry);
            }

            return Task.CompletedTask;
        }

        public Task<bool> IsTokenBlacklistedAsync(string jti)
        {
            return Task.FromResult(_memoryCache.TryGetValue(jti, out _));
        }
    }

}

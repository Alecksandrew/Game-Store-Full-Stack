using GameStoreAPI.Shared;

namespace GameStoreAPI.Features.Wishlist.WishlistService
{
    public interface IWishlistService
    {
        public Task<Result<object>> GetWishlistedGamesAsync(string userId);
        public Task<Result<object>> AddToWishlistAsync(string userId, int gameId);
        public  Task<Result<object>> RemoveFromWishlistAsync(string userId, int gameId);
    }
}

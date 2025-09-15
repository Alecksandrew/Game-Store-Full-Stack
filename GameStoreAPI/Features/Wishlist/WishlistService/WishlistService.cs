using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.GamesService;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;

namespace GameStoreAPI.Features.Wishlist.WishlistService
{
    public class WishlistService : IWishlistService
    {


        private readonly AppDbContext _dbContext;
        private readonly IGameService _gamesService;

        public WishlistService(AppDbContext dbContext, IGameService gamesService)
        {
            _dbContext = dbContext;
            _gamesService = gamesService;
        }


        public async Task<Result<object>> GetWishlistedGamesAsync(string userId)
        {
            var wishlistedGameIds = await _dbContext.WishlistedGames
                                    .Where(wg => wg.UserId == userId)
                                    .Select(wg => wg.IgdbId)
                                    .ToListAsync();

            if (!wishlistedGameIds.Any())
            {
                return Result<object>.Ok(new List<object>());
            }


            var gamesResult = await _gamesService.GetGamesSummariesByIdsAsync(wishlistedGameIds);

            if (gamesResult.IsFailure)
            {
                return Result<object>.Fail(gamesResult.Error);
            }

            return Result<object>.Ok(gamesResult.Value);

        }

        public async Task<Result<object>> AddToWishlistAsync(string userId, int gameId)
        {
            var gameExists = await _dbContext.GamesInventory.AnyAsync(g => g.IgdbId == gameId);
            if (!gameExists)
            {
                return Result<object>.Fail(new Error("Wishlist.GameNotFound", "Game not found in inventory."));
            }

            var alreadyWishlisted = await _dbContext.WishlistedGames.AnyAsync(wg => wg.UserId == userId && wg.IgdbId == gameId);
            if (alreadyWishlisted)
            {
                return Result<object>.Ok(new { message = "Game is already in the wishlist." });
            }

            var wishlistedGame = new WishlistedGame
            {
                UserId = userId,
                IgdbId = gameId
            };

            await _dbContext.WishlistedGames.AddAsync(wishlistedGame);
            await _dbContext.SaveChangesAsync();

            return Result<object>.Ok(new { message = "Game added to wishlist successfully." });
        }

        public async Task<Result<object>> RemoveFromWishlistAsync(string userId, int gameId)
        {
            var wishlistedGame = await _dbContext.WishlistedGames
                .FirstOrDefaultAsync(wg => wg.UserId == userId && wg.IgdbId == gameId);

            if (wishlistedGame == null)
            {
                return Result<object>.Fail(new Error("Wishlist.ItemNotFound", "Game not found in wishlist."));
            }

            _dbContext.WishlistedGames.Remove(wishlistedGame);
            await _dbContext.SaveChangesAsync();

            return Result<object>.Ok(null);
        }
    }
}

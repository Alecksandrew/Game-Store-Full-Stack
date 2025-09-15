using GameStoreAPI.Features.Wishlist.WishlistService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameStoreAPI.Features.Wishlist
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }


        [HttpGet]
        public async Task<IActionResult> GetWishlistedGames()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null) return Unauthorized();

            var result = await _wishlistService.GetWishlistedGamesAsync(userId);
            return Ok(result.Value);
        }

        [HttpPost("{gameId}")]
        public async Task<IActionResult> AddToWishlist(int gameId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null) return Unauthorized();

            var result = await _wishlistService.AddToWishlistAsync(userId, gameId);

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return StatusCode(201, result.Value);
        }


        [HttpDelete("{gameId}")]
        public async Task<IActionResult> RemoveFromWishlist(int gameId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null) return Unauthorized();

            var result = await _wishlistService.RemoveFromWishlistAsync(userId, gameId);

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }
    }
}

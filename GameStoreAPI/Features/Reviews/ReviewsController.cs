using GameStoreAPI.Data;
using GameStoreAPI.Features.Reviews.ReviewsService;
using GameStoreAPI.Models;
using GameStoreAPI.Shared.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Features.Reviews
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewsService _reviewService;

        public ReviewsController(IReviewsService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("/api/games/{gameId}/reviews")]
        public async Task<IActionResult> GetReviewsByGame(
            int gameId, 
            [FromQuery] DateTime? lastCreatedAt = null,
            [FromQuery] int? lastId = null,
            [FromQuery] int pageSize = 10)
        {
            if (pageSize <= 0)
                return BadRequest($"{nameof(pageSize)} size must be greater than 0.");

            List<Review> reviews = await _reviewService.GetMostRecentReviewsByGameAsync(gameId, lastCreatedAt, lastId, pageSize);

            PageCursorDto? nextCursor = null;
            if (reviews.Any())
            {
                nextCursor = new(reviews.Last().CreatedAt, reviews.Last().Id);
            }

            PagedResponseDto<Review> response = new(reviews, nextCursor);


            return Ok(response);

        }

    
    }
}

using GameStoreAPI.Data;
using GameStoreAPI.Features.Reviews.Dto.CreateReviewByGame;
using GameStoreAPI.Features.Reviews.ReviewsService;
using GameStoreAPI.Models;
using GameStoreAPI.Shared.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

       
        [HttpPost("/api/games/{gameId}/reviews")]
        [Authorize]
        public async Task<IActionResult> CreateReviewByGame(CreateReviewByGameRequestDto req)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            try
            {
                var userReview = await _reviewService.CreateReviewByGameAsync(userId, req.GameIgdbId, req.Rating, req.Description);

                CreateReviewByGameResponseDto response = new CreateReviewByGameResponseDto
                {
                    Id = userReview.Id,
                    Rating = userReview.Rating,
                    Description = userReview.Description,
                    CreatedAt = userReview.CreatedAt,
                    Username = userReview.User.UserName ?? "Unknown User",

                };
                return CreatedAtAction(
                    nameof(GetReviewById),
                    new { gameId = userReview.GameIgdbId, reviewId = userReview.Id },
                    response
                );
            }
            catch (KeyNotFoundException ex) 
            {
                return NotFound(new { message = ex.Message });
            }

        }


    }
}

using GameStoreAPI.Data;
using GameStoreAPI.Features.Reviews.Dto.CreateReviewByGame;
using GameStoreAPI.Features.Reviews.Dto.GetMyReviewByGame;
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

        public ReviewsController(IReviewsService reviewService, ILogger<ReviewsController> logger)
        {
            _reviewService = reviewService;
        }

        [HttpGet("~/api/games/{gameId}/reviews")]
        public async Task<IActionResult> GetReviewsByGame(
            int gameId, 
            [FromQuery] DateTime? lastCreatedAt = null,
            [FromQuery] int? lastId = null,
            [FromQuery] int pageSize = 10)
        {
            if (pageSize <= 0)
                return BadRequest($"{nameof(pageSize)} size must be greater than 0.");

            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            List<Review> reviews = await _reviewService.GetMostRecentReviewsByGameAsync(
                gameId, 
                lastCreatedAt,                
                pageSize,
                lastId,
                userId);

            PageCursorDto? nextCursor = null;
            if (reviews.Any())
            {
                nextCursor = new(reviews.Last().CreatedAt, reviews.Last().Id);
            }

            List<GetMyReviewByGameResponseDto> reviewsDto = new();
            foreach (var review in reviews)
            {
                GetMyReviewByGameResponseDto newReview = new GetMyReviewByGameResponseDto
                {
                    Id = review.Id,
                    UserName = review?.User?.UserName ?? "Uknown user",
                    Rating = review.Rating,
                    Description = review.Description,
                    CreatedAt = review.CreatedAt,

                };
                reviewsDto.Add(newReview);
            }

            PagedResponseDto<GetMyReviewByGameResponseDto> response = new(reviewsDto, nextCursor);


            return Ok(response);

        }

       
        [HttpPost("~/api/games/{gameId}/reviews")]
        [Authorize]
        public async Task<IActionResult> CreateReviewByGame(int gameId, CreateReviewByGameRequestDto req)
        {
           
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            try
            {
                var userReview = await _reviewService.CreateReviewByGameAsync(userId, gameId, req.Rating, req.Description);
                CreateReviewByGameResponseDto response = new CreateReviewByGameResponseDto
                {
                    Id = userReview.Id,
                    Rating = userReview.Rating,
                    Description = userReview.Description,
                    CreatedAt = userReview.CreatedAt,
                    Username = userReview.User.UserName ?? "Unknown User",

                };
                // nameof(GetReviewById),
                //new { gameId = userReview.GameIgdbId, reviewId = userReview.Id },
                return Ok(
                   
                    response
                );
            }
            catch (KeyNotFoundException ex) 
            {
                return NotFound(new { message = ex.Message });
            }

        }


        [HttpGet("~/api/games/{gameId}/reviews/me")]
        [Authorize]
        public async Task<IActionResult> GetMyReviewsByGame(int gameId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var reviews = await _reviewService.GetMyReviewsByGameAsync(gameId, userId);

            if (reviews == null)
            {
                return NotFound();
            }

            List<GetMyReviewByGameResponseDto> response = new();
            foreach (var review in reviews) 
            {
                GetMyReviewByGameResponseDto reviewDto = new GetMyReviewByGameResponseDto
                {
                    Id = review.Id,
                    UserName = review.User.UserName ?? "Unknown user",
                    Rating = review.Rating,
                    Description = review.Description,
                    CreatedAt = review.CreatedAt,
                };

                response.Add(reviewDto);
            }


            return Ok(response);

        }

        [HttpDelete("/{reviewId}")]
        [Authorize]
        public async Task<IActionResult> DeleteMyReview(int reviewId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var result = await _reviewService.DeleteMyReviewAsync(reviewId, userId);

            if (result.IsSuccess && result.Value == null)
                return NoContent();

            
            return result.Error?.Code == "Review.Forbidden"
                ? Forbid()
                : BadRequest(result);

        }
    }
}


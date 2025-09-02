using GameStoreAPI.Features.Reviews.Dto.UpdateReview;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;

namespace GameStoreAPI.Features.Reviews.ReviewsService
{
    public interface IReviewsService
    {

        public Task<List<Review>> GetMostRecentReviewsByGameAsync(
           int gameId,
           DateTime? lastCreatedAt = null,
           int pageSize = 10,
           int? lastId = null,
           string? userId = null);

        public Task<Review> CreateReviewByGameAsync(
            string userId,
            int gameId,
            double rating,
            string? description
            );

        public Task<List<Review>> GetMyReviewsByGameAsync(
            int gameId,
            string userId
            );

        public Task<Result<Review>> DeleteMyReviewAsync(int reviewId, string userId);

        Task<Result<Review>> UpdateMyReviewAsync(int reviewId, string userId, UpdateReviewRequestDto updateDto);
    }
}

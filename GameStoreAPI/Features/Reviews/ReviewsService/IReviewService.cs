using GameStoreAPI.Models;

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
    }
}

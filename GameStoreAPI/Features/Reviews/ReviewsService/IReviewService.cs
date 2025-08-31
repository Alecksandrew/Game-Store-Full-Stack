using GameStoreAPI.Models;

namespace GameStoreAPI.Features.Reviews.ReviewsService
{
    public interface IReviewsService
    {

        public Task<List<Review>> GetMostRecentReviewsByGameAsync(
            int gameId,
            DateTime? lastCreatedAt = null,
            int? lastId = null,
            int pageSize = 10);

        public Task<Review> CreateReviewByGameAsync(
            string userId,
            int gameId,
            double rating,
            string? description
            );
    }
}

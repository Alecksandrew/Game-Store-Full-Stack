using GameStoreAPI.Data;
using GameStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Features.Reviews.ReviewsService
{
    public class ReviewsService :IReviewsService
    {

        private readonly AppDbContext _dbContext;

        public ReviewsService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Review>> GetMostRecentReviewsByGameAsync(
            int gameId,
            DateTime? lastCreatedAt = null, 
            int? lastId = null,
            int pageSize = 10)
        {

            var query = _dbContext.Reviews
                                .Where(r => r.GameIgdbId == gameId)
                                .OrderByDescending(x => x.CreatedAt)
                                .ThenByDescending(x => x.Id) //tiebreaker if the reviews were created at the same second
                                .AsQueryable();

            if (lastCreatedAt.HasValue && lastId.HasValue)
            {
                query = query.Where(r =>
                    r.CreatedAt < lastCreatedAt.Value ||
                    r.CreatedAt == lastCreatedAt.Value && r.Id < lastId.Value //Logic if there are several reviews at the same time
                                                                              //This still gonna work because of Id
                );
            }

            var reviews = await query.Take(pageSize).ToListAsync();

            return reviews;
        }
    }
}

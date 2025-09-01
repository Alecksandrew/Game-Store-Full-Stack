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
            int pageSize = 10,
            int? lastId = null,
            string? userId = null)
        {

            //If user is in his account, then dont fetch his reviews -> use the other endpoint -> Because frontend will be able to display his reviews always on top of the page
            // If user is not in his account, then fetch all reviews
            IQueryable<Review> query;
            if(userId is null)
            {
                query = _dbContext.Reviews
                        .Where(r => r.GameIgdbId == gameId)
                        .OrderByDescending(x => x.CreatedAt)
                        .ThenByDescending(x => x.Id) //tiebreaker if the reviews were created at the same second
                        .AsQueryable();
            }
            else
            {
                query = _dbContext.Reviews
                        .Where(r => r.GameIgdbId == gameId && r.UserId != userId)
                        .OrderByDescending(x => x.CreatedAt)
                        .ThenByDescending(x => x.Id) //tiebreaker if the reviews were created at the same second
                        .AsQueryable();
            }



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

        public async Task<List<Review>> GetMyReviewsByGameAsync(
            int gameId,
            string userId
        )
        {
            return await _dbContext.Reviews
                .Where(r => r.GameIgdbId == gameId && r.UserId == userId).ToListAsync();
        }



        public async Task<Review> CreateReviewByGameAsync(
            string userId,
            int gameId,
            double rating,
            string? description
            )
        {
            var game = await _dbContext.GamesInventory.AnyAsync(g => g.IgdbId == gameId);
            if(!game)
            {
                throw new KeyNotFoundException($"Game with IGDB ID '{gameId}' not found.");
            }

            Review userReview = new Review
            {
                UserId = userId,
                GameIgdbId = gameId,
                Rating = rating,
                Description = description

            };

            await _dbContext.Reviews.AddAsync(userReview);
            await _dbContext.SaveChangesAsync();

            var createdReviewWithUser = await _dbContext.Reviews
                                              .Include(r => r.User)
                                              .FirstAsync(r => r.Id == userReview.Id);

            return createdReviewWithUser;
        }

    }
}

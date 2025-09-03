using GameStoreAPI.Data;
using GameStoreAPI.Features.Reviews.Dto.UpdateReview;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Features.Reviews.ReviewsService
{
    public class ReviewsService :IReviewsService
    {

        private readonly AppDbContext _dbContext;

        public ReviewsService(AppDbContext dbContext, ILogger<ReviewsService> logger)
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
                        .Include(r => r.User)
                        .Where(r => r.IgdbId == gameId)
                        .OrderByDescending(x => x.CreatedAt)
                        .ThenByDescending(x => x.Id) //tiebreaker if the reviews were created at the same second
                        .AsQueryable();
            }
            else
            {
                query = _dbContext.Reviews
                        .Include(r => r.User)
                        .Where(r => r.IgdbId == gameId && r.UserId != userId)
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
                .Include(r => r.User)
                .Where(r => r.IgdbId == gameId && r.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ThenByDescending(x => x.Id)
                .ToListAsync();
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
                IgdbId = gameId,
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


        public async Task<Result<Review>> UpdateMyReviewAsync(int reviewId, string userId, UpdateReviewRequestDto updateDto)
        {
            var review = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);

            if (review == null)
            {
                return Result<Review>.Fail(new Error("Review.NotFound", "Review not found."));
            }

            if (review.UserId != userId)
            {
                return Result<Review>.Fail(new Error("Review.Forbidden", "You don't have permission to update this review."));
            }

            review.Rating = updateDto.Rating;
            review.Description = updateDto.Description;
          
            await _dbContext.SaveChangesAsync();

            return Result<Review>.Ok(review);
        }

        public async Task<Result<Review>> DeleteMyReviewAsync(int reviewId, string userId)
        {
            var reviewExists = await _dbContext.Reviews.AnyAsync(r => r.Id == reviewId);
            if (!reviewExists)
            {
                return Result<Review>.Ok(null);

            }

            var myReview = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId && r.UserId == userId);
            if (myReview == null)
            {
                return Result<Review>.Fail(new Error("Review.Forbidden", "You don't have permission to delete this review."));
            }

            _dbContext.Reviews.Remove(myReview);
            await _dbContext.SaveChangesAsync();

            return Result<Review>.Ok(null);
        }
    }
}

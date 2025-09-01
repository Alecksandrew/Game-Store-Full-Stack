using GameStoreAPI.Data;
using GameStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Features.Reviews.ReviewsService
{
    public class ReviewsService :IReviewsService
    {

        private readonly AppDbContext _dbContext;
        private readonly ILogger<ReviewsService> _logger;

        public ReviewsService(AppDbContext dbContext, ILogger<ReviewsService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
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
                        .Where(r => r.IgdbId == gameId)
                        .OrderByDescending(x => x.CreatedAt)
                        .ThenByDescending(x => x.Id) //tiebreaker if the reviews were created at the same second
                        .AsQueryable();
            }
            else
            {
                query = _dbContext.Reviews
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
                .Where(r => r.IgdbId == gameId && r.UserId == userId).ToListAsync();
        }



        public async Task<Review> CreateReviewByGameAsync(
            string userId,
            int gameId,
            double rating,
            string? description
            )
        {
            _logger.LogInformation("Iniciando criação de review para o jogo {GameId}", gameId);
            _logger.LogDebug("Dados da requisição: {@RequestData}", new { gameId, rating, description });

            var game = await _dbContext.GamesInventory.AnyAsync(g => g.IgdbId == gameId);
            if(!game)
            {
                _logger.LogWarning("Jogo não encontrado. GameId: {GameId}, UserId: {UserId}", gameId, userId);
                throw new KeyNotFoundException($"Game with IGDB ID '{gameId}' not found.");
            }
            _logger.LogInformation("Jogo encontrado. GameId: {GameId}, UserId: {UserId}", gameId, userId);

            Review userReview = new Review
            {
                UserId = userId,
                IgdbId = gameId,
                Rating = rating,
                Description = description

            };

            await _dbContext.Reviews.AddAsync(userReview);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("Review criada com sucesso. ReviewId: {ReviewId}", userReview.Id);

            var createdReviewWithUser = await _dbContext.Reviews
                                              .Include(r => r.User)
                                              .FirstAsync(r => r.Id == userReview.Id);

            return createdReviewWithUser;
        }

    }
}

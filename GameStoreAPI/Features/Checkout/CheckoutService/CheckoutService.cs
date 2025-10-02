using GameStoreAPI.Data;
using GameStoreAPI.Features.Checkout.Dtos;
using GameStoreAPI.Features.Games.GamesService;
using GameStoreAPI.Models;
using GameStoreAPI.Services.EmailService;
using GameStoreAPI.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace GameStoreAPI.Features.Checkout.CheckoutService
{
    public class CheckoutService : ICheckoutService
    {
        private readonly AppDbContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IGameService _gameService;

        public CheckoutService(AppDbContext dbContext, IEmailService emailService, UserManager<IdentityUser> userManager, IGameService gameService)
        {
            _dbContext = dbContext;
            _emailService = emailService;
            _userManager = userManager;
            _gameService = gameService;
        }

        public async Task<Result<object>> ProcessCheckoutAsync(CheckoutRequestDto request, string userId)
        {
            if (!SimulatePayment(request.CardDetails))
            {
                return Result<object>.Fail(new Error("Payment.Failed", "The payment has failed!"));
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Result<object>.Fail(new Error("User.NotFound", "User not found!"));
            }

            var gamesResult = await _gameService.GetGamesSummariesByIdsAsync(request.GameIds);
            if (gamesResult.IsFailure) return Result<object>.Fail(gamesResult.Error);
            var gameNamesMap = gamesResult.Value.ToDictionary(g => g.Id, g => g.Name);

            var purchasedKeys = new List<GameKey>();
            var purchasedGamesInfo = new List<(string GameName, string KeyValue)>();

            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    foreach (var gameId in request.GameIds)
                    {
                        var gameInventory = await _dbContext.GamesInventory.FindAsync(gameId);
                        if (gameInventory == null)
                        {
                            await transaction.RollbackAsync();
                            return Result<object>.Fail(new Error("Game.NotFound", $"Game with ID {gameId} not found."));
                        }

                        var availableKey = await _dbContext.GameKeys
                            .FirstOrDefaultAsync(k => k.GameIgdbId == gameId && !k.IsSold);

                        if (availableKey == null)
                        {
                            await transaction.RollbackAsync();
                            return Result<object>.Fail(new Error("Game.OutOfStock", $"Game {gameInventory.IgdbId} is running out of keys."));
                        }

                        availableKey.IsSold = true;
                        availableKey.UserId = userId;
                        _dbContext.GameKeys.Update(availableKey);

                        purchasedKeys.Add(availableKey);

                        var gameName = gameNamesMap.GetValueOrDefault(gameId, $"Jogo ID {gameId}");
                        purchasedGamesInfo.Add((gameName, availableKey.KeyValue));
                    }

                    await _dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return Result<object>.Fail(new Error("Checkout.Failed", "An error has ocurred during checkout"));
                }
            }

          
            await SendPurchaseEmailAsync(user.Email, user.UserName, purchasedGamesInfo);

            return Result<object>.Ok(new { message = "Purchase made successfully! Game keys were sent to your email" });
        }

        private bool SimulatePayment(CreditCardDto creditCard)
        {
            //Only a simple simulation of payment
            return !string.IsNullOrEmpty(creditCard.CardNumber) &&
                   !string.IsNullOrEmpty(creditCard.ExpiryDate) &&
                   !string.IsNullOrEmpty(creditCard.Cvc);
        }

        private async Task SendPurchaseEmailAsync(string toEmail, string name, List<(string GameName, string KeyValue)> games)
        {
            var subject = "Your games keys - Game Store";
            var htmlContent = new StringBuilder();
            htmlContent.Append($"<h1>Hello, {name}!</h1>");
            htmlContent.Append("<p>Thanks for buying in game store. Here your game keys are:</p>");
            htmlContent.Append("<ul>");

            foreach (var game in games)
            {
                htmlContent.Append($"<li><strong>{game.GameName}:</strong> {game.KeyValue}</li>");
            }

            htmlContent.Append("</ul>");
            htmlContent.Append("<p>Enjoy your games!</p>");

            await _emailService.SendEmailAsync(toEmail, subject, htmlContent.ToString());
        }
    }
}

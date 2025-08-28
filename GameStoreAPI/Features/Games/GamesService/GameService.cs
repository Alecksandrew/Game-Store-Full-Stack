using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.Dtos.GetGame;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Features.Games.Dtos.GetGameSummary;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;
using Microsoft.EntityFrameworkCore;
using System.Runtime.ConstrainedExecution;
using static Azure.Core.HttpHeader;

namespace GameStoreAPI.Features.Games.GamesService
{
    public class GameService : IGameService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _dbContext;
        private readonly IIGDBService _igdbService;

        private static readonly Random _random = new Random();//This gonna help to generate better random fake keys

        //PRIVATE METHODS================================================
        public GameService(IConfiguration configuration, AppDbContext context, IIGDBService igdbService)
        {
            _dbContext = context;
            _configuration = configuration;
            _igdbService = igdbService;
        }
        private GameInventory CreateFakeInventoryForGame(int igdbId)
        {
            var stock = _random.Next(5, 15);
            int price = _random.Next(29, 299);
            int discountPrice = 0;

            //Logic to add discount only in some games and not in everything
            if (_random.Next(0, 4) == 0)
            {
                double discountPercentage = _random.Next(5, 91) / 100.0;
                discountPrice = (int)(price * (1 - (decimal)discountPercentage));
            }

            // Fake game keys to sell
            var newKeys = new List<GameKey>();
            for (int i = 0; i < stock; i++)
            {
                newKeys.Add(new GameKey
                {
                    GameIgdbId = igdbId,
                    KeyValue = $"FAKE-{Guid.NewGuid().ToString().ToUpper()}",
                    IsSold = false
                });
            }

            GameInventory gameInventory = new GameInventory
            {
                IgdbId = igdbId,
                Price = price,
                DiscountPrice = discountPrice,
                TotalSells = 0,
                GameKeys = newKeys
            };

            return gameInventory;
        }
        private async Task<Dictionary<int, GameInventory>> GetOrCreateInventoriesForGamesAsync(List<int> gameIds)
        {
            
            var existingInventories = await _dbContext.GamesInventory
                                        .Include(gi => gi.GameKeys)
                                        .Where(gi => gameIds.Contains(gi.IgdbId))
                                        .ToDictionaryAsync(gi => gi.IgdbId);

           
            var missingIds = gameIds.Except(existingInventories.Keys).ToList();

            var newInventoriesToCreate = new List<GameInventory>();
            foreach (var id in missingIds)
            {
                var newInventory = CreateFakeInventoryForGame(id);
                newInventoriesToCreate.Add(newInventory);
            }

            if (newInventoriesToCreate.Any())
            {
               
                await _dbContext.GamesInventory.AddRangeAsync(newInventoriesToCreate);

   
                await _dbContext.SaveChangesAsync();

               
                foreach (var inventory in newInventoriesToCreate)
                {
                    existingInventories[inventory.IgdbId] = inventory;
                }
            }

            return existingInventories;
        }
        private GameDetailsResponseDto MapToGamesDetailsResponseDto(GameDetailsResponseIGDBDto igdbGame, GameInventory gameInventory, int availableStock)
        {

            //Return screenshots url to frontend
            var screenshotsUrls = igdbGame.Screenshots?
                .Select(s => $"https://images.igdb.com/igdb/image/upload/t_screenshot_big/{s.ImageId}.jpg")
                .ToList() ?? new List<string>();

            var platforms = igdbGame.Platforms?
                .Select(p => p.Name)
                .ToList() ?? new List<string>();

            var videosUrls = igdbGame.Videos?
                .Select(v => $"https://www.youtube.com/embed/{v.VideoId}")
                .ToList() ?? new List<string>();

            var coverUrl = $"https://images.igdb.com/igdb/image/upload/t_cover_big/{igdbGame.Cover?.ImageId}.jpg"
               ?? string.Empty;

            long? unixTimestamp = igdbGame.FirstReleaseDate;
            string? formattedDate = null;
            if (unixTimestamp != null)
            {
                DateTime date = DateTimeOffset.FromUnixTimeSeconds((long)unixTimestamp).DateTime;
                formattedDate = date.ToString("MM/dd/yyyy");
            }


            GameDetailsResponseDto response = new GameDetailsResponseDto
            {
                Id = gameInventory.IgdbId,
                Name = igdbGame.Name,
                Summary = igdbGame.Summary,
                Genres = igdbGame.Genres, 
                FirstReleaseDate = formattedDate,
                CoverUrl = coverUrl,
                ScreenshotsImageUrl = screenshotsUrls,
                Platforms = platforms,
                Videos = videosUrls,
                Price = gameInventory.Price,
                DiscountPrice = gameInventory.DiscountPrice,
                TotalSells = gameInventory.TotalSells,
                AvailableKeysStock = availableStock,

            };

            return response;
        }



        //SERVICES================================================
        //Get one specific game
        public async Task<Result<GameDetailsResponseDto>> GetGameDetailsAsync(int igdbId)
        {
            var igdbGame = await _igdbService.GetGameByIdAsync(igdbId);
            if (igdbGame is null)
            {
                return Result<GameDetailsResponseDto>.Fail(new Error("Game.NotFound", "Game was not found in IGDB Database.")); ;
            }

            //Verify if i have some purchase infos in my database about the game from external API
            //If not, put some fake data to simulate
            List<int> id = new List<int> {igdbId }; //Only to work in the function perfect
            var gameInventory = await GetOrCreateInventoriesForGamesAsync(id);

            var availableStock = await _dbContext.GameKeys.CountAsync(key => key.GameIgdbId == igdbId && !key.IsSold);
            var responseDto = MapToGamesDetailsResponseDto(igdbGame, gameInventory[igdbId], availableStock);

            return Result<GameDetailsResponseDto>.Ok(responseDto);
        }

        //Get several games
        public async Task<Result<object>> GetGamesAsync(GetGamesRequestDto parameters)
        {
            var igdbGames = await _igdbService.GetGamesAsync(parameters);
            if (igdbGames is null || !igdbGames.Any())
            {
                return Result<object>.Ok(new List<GameSummaryResponseDto>());
            }

            var gameIds = igdbGames.Select(g => g.Id).ToList();

            var inventories = await GetOrCreateInventoriesForGamesAsync(gameIds);

            if (parameters.Detailed)
            {
                var keysStockMap = await _dbContext.GameKeys
                    .Where(k => gameIds.Contains((int)k.GameIgdbId) && !k.IsSold)
                    .GroupBy(k => k.GameIgdbId)
                    .Select(g => new { GameId = g.Key, Stock = g.Count() })
                    .ToDictionaryAsync(g => g.GameId, g => g.Stock);

                var gameDetailsList = igdbGames.Select(igdbGame =>
                {
                    var inventory = inventories[igdbGame.Id];
                    var stock = keysStockMap.GetValueOrDefault(igdbGame.Id, 0);
                    return MapToGamesDetailsResponseDto(igdbGame, inventory, stock);
                }).ToList();

                return Result<object>.Ok(gameDetailsList);
            }
            else
            {
                var gameSummaryList = igdbGames.Select(igdbGame =>
                {
                    var inventory = inventories[igdbGame.Id];
                    return new GameSummaryResponseDto
                    {
                        Id = igdbGame.Id,
                        Name = igdbGame.Name,
                        CoverUrl = $"https://images.igdb.com/igdb/image/upload/t_cover_big/{igdbGame.Cover?.ImageId}.jpg" ?? string.Empty,
                        Price = inventory.Price,
                        DiscountPrice = inventory.DiscountPrice
                    };
                }).ToList();

                return Result<object>.Ok(gameSummaryList);
            }
        }

    
    }
        
}

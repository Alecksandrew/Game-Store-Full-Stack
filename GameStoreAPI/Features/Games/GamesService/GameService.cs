using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Features.Games.GamesService
{
    public class GameService : IGameService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _dbContext;
        private readonly IIGDBService _igdbService;

        public GameService( IConfiguration configuration, AppDbContext context, IIGDBService igdbService)
        {
            _dbContext = context;
            _configuration = configuration;
            _igdbService = igdbService;
        }
        private async Task<GameInventory> CreateFakePurchaseInfoAsync(int igdbId)
        {
            var gameInventory = await _dbContext.GamesInventory.FindAsync(igdbId);
            if (gameInventory == null)
            {
                var random = new Random();
                var stock = random.Next(5, 15);
                int price = random.Next(29, 299);
                int discountPrice = 0;

                //Logic to add discount only in some games and not in everything
                if (random.Next(0, 4) == 0)
                {      
                    double discountPercentage = random.Next(5, 91) / 100.0;
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

                gameInventory = new GameInventory
                {
                    IgdbId = igdbId,
                    Price = price,
                    DiscountPrice = discountPrice,
                    TotalSells = 0,
                    GameKeys = newKeys
                };

                await _dbContext.GamesInventory.AddAsync(gameInventory);

                await _dbContext.SaveChangesAsync();
            }

            return gameInventory;
        }
        private async Task<GameDetailsResponseDto> MapToGamesDetailsResponseDto(GameDetailsResponseIGDBDto igdbGame, GameInventory gameInventory)
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
                FirstReleaseDate = formattedDate,
                CoverUrl = coverUrl,
                ScreenshotsImageUrl = screenshotsUrls,
                Platforms = platforms,
                Videos = videosUrls,
                Price = gameInventory.Price,
                DiscountPrice = gameInventory.DiscountPrice,
                TotalSells = gameInventory.TotalSells,
                AvailableKeysStock = await _dbContext.GameKeys.CountAsync(key => key.GameIgdbId == gameInventory.IgdbId && !key.IsSold)

            };

            return response;
        }
        public async Task<Result<GameDetailsResponseDto>> GetGameDetailsAsync(int igdbId)
        {
            var igdbGame = await _igdbService.GetGameByIdAsync(igdbId);
            if (igdbGame is null)
            {
                return Result<GameDetailsResponseDto>.Fail(new Error("Game.NotFound", "Game was not found in IGDB Database.")); ;
            }

            //Verify if i have some purchase infos in my database about the game from external API
            //If not, put some fake data to simulate
            var gameInventory = await CreateFakePurchaseInfoAsync(igdbId);

            var responseDto = await MapToGamesDetailsResponseDto(igdbGame, gameInventory);
            
            return Result<GameDetailsResponseDto>.Ok(responseDto);
        }

       
    }
}

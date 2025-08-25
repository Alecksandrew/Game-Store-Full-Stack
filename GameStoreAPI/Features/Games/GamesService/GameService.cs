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
                int discountPrice = random.Next(1, price);

                gameInventory = new GameInventory
                {
                    IgdbId = igdbId,
                    Price = price,
                    DiscountPrice = discountPrice,
                    TotalSells = 0
                };

                await _dbContext.GamesInventory.AddAsync(gameInventory);

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

                await _dbContext.GameKeys.AddRangeAsync(newKeys);

                await _dbContext.SaveChangesAsync();
            }

            return gameInventory;
        }
        private async Task<GameDetailsResponseDto> MapToGamesDetailsResponseDto(GameDetailsResponseIGDBDto igdbGame, GameInventory gameInventory)
        {

            //Return screenshots url to frontend
            List<string> screenshotsIds = igdbGame.ScreenshotsImageId.Select(s => s.Image_Id).ToList();
            List<string> screenshotsUrls = new List<string>();
            if (screenshotsIds is not null)
            {
                foreach (var screenshotId in screenshotsIds)
                {
                    string screenshotUrl = $"https://images.igdb.com/igdb/image/upload/screenshot_big/{screenshotId}.jpg";
                    screenshotsUrls.Add(screenshotUrl);
                }
            }

            //Return array platforms to frontend
            List<string> platforms = igdbGame.Platforms.Select(p => p.Name).ToList();


            //return videos url to frontend
            List<string> videosIds = igdbGame.Videos.Select(s => s.Video_Id).ToList();
            List<string> videosUrls = new List<string>();
            if (videosIds is not null)
            {
                foreach (var videosId in videosIds)
                {
                    string videoUrl = $"https://www.youtube.com/embed/{videosId}";
                    videosUrls.Add(videoUrl);
                }
            }

            GameDetailsResponseDto response = new GameDetailsResponseDto
            {
                Id = gameInventory.IgdbId,
                Name = igdbGame.Name,
                Summary = igdbGame.Summary,
                FirstReleaseDate = igdbGame.FirstReleaseDate,
                CoverImageId = igdbGame.CoverImageId,
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

using GameStoreAPI.Data;
using GameStoreAPI.Features.Admin.Dtos;
using GameStoreAPI.Features.Admin.Dtos.AddKeys;
using GameStoreAPI.Features.Admin.Dtos.UpdatePrice;
using GameStoreAPI.Features.Games.Dtos.GetGame;
using GameStoreAPI.Features.Games.Dtos.GetGameSummary;
using GameStoreAPI.Features.Games.GamesService;
using GameStoreAPI.Models;
using GameStoreAPI.Shared;
using GameStoreAPI.Shared.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Features.Admin.AdminService
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _dbContext;
        private readonly IGameService _gameService;

        public AdminService(AppDbContext dbContext, IGameService gameService)
        {
            _dbContext = dbContext;
            _gameService = gameService;
        }

        public async Task<Result<PaginatedResponseDto<AdminResponseDto>>> GetGamesInventoryAsync(int page, int pageSize, string? search = null, string? sortBy = null, bool ascending = true)
        {
            var query = _dbContext.GamesInventory.AsQueryable();


            //Search
            if (!string.IsNullOrWhiteSpace(search))
            {
                var igdbResult = await _gameService.GetGamesAsync(new GetGamesRequestDto { Search = search, PageSize = 100 });

                if (igdbResult.IsSuccess && igdbResult.Value is List<GameSummaryResponseDto> foundGames)
                {
                    var foundIds = foundGames.Select(g => g.Id).ToList();
                    query = query.Where(gi => foundIds.Contains(gi.IgdbId));
                }
                else
                {
                    return Result<PaginatedResponseDto<AdminResponseDto>>.Ok(new PaginatedResponseDto<AdminResponseDto> { Items = new List<AdminResponseDto>(), TotalCount = 0 });
                }
            }



            //Sorting
            if (!string.Equals(sortBy, "name", StringComparison.OrdinalIgnoreCase))
            {
                query = sortBy?.ToLower() switch
                {
                    "price" => ascending ? query.OrderBy(g => g.Price) : query.OrderByDescending(g => g.Price),
                    "discountprice" => ascending ? query.OrderBy(g => g.DiscountPrice) : query.OrderByDescending(g => g.DiscountPrice),
                    "availablekeys" => ascending ? query.OrderBy(g => g.GameKeys.Count(k => !k.IsSold)) : query.OrderByDescending(g => g.GameKeys.Count(k => !k.IsSold)),
                    _ => query.OrderBy(g => g.IgdbId)
                };
            }


            var totalCount = await query.CountAsync();

            var gameInventories = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(g => g.GameKeys)
                .ToListAsync();

            if (!gameInventories.Any())
            {
                return Result<PaginatedResponseDto<AdminResponseDto>>.Ok(new PaginatedResponseDto<AdminResponseDto> { Items = new List<AdminResponseDto>(), TotalCount = 0 });
            }

            var gameIds = gameInventories.Select(g => g.IgdbId).ToList();
            var gameSummariesResult = await _gameService.GetGamesSummariesByIdsAsync(gameIds);

            if (gameSummariesResult.IsFailure)
            {
                return Result<PaginatedResponseDto<AdminResponseDto>>.Fail(gameSummariesResult.Error);
            }

            var gameNamesMap = gameSummariesResult.Value.ToDictionary(g => g.Id, g => g.Name);

            var dtos = gameInventories.Select(gi => new AdminResponseDto
            {
                IgdbId = gi.IgdbId,
                Name = gameNamesMap.GetValueOrDefault(gi.IgdbId, "Name Not Found"),
                Price = gi.Price,
                DiscountPrice = gi.DiscountPrice,
                AvailableKeys = gi.GameKeys.Count(k => !k.IsSold)
            }).ToList();


            //Sorting
            if (string.Equals(sortBy, "name", StringComparison.OrdinalIgnoreCase))
            {
                dtos = ascending ? dtos.OrderBy(d => d.Name, StringComparer.OrdinalIgnoreCase).ToList() : dtos.OrderByDescending(d => d.Name, StringComparer.OrdinalIgnoreCase).ToList();
            }

            var paginatedResponse = new PaginatedResponseDto<AdminResponseDto>
            {
                Items = dtos,
                TotalCount = totalCount
            };

            return Result<PaginatedResponseDto<AdminResponseDto>>.Ok(paginatedResponse);
        }

        public async Task<Result<GameInventory>> UpdateGamePriceAsync(int igdbId, UpdatePriceRequestDto dto)
        {
            var gameInventory = await _dbContext.GamesInventory.FindAsync(igdbId);
            if (gameInventory == null)
            {
                return Result<GameInventory>.Fail(new Error("Admin.GameNotFound", "Game not found in inventory."));
            }

            gameInventory.Price = dto.Price;
            gameInventory.DiscountPrice = dto.DiscountPrice;
            await _dbContext.SaveChangesAsync();

            return Result<GameInventory>.Ok(gameInventory);
        }

        public async Task<Result<GameInventory>> AddGameKeysAsync(int igdbId, AddKeysRequestDto dto)
        {
            var gameInventory = await _dbContext.GamesInventory.FindAsync(igdbId);
            if (gameInventory == null)
            {
                return Result<GameInventory>.Fail(new Error("Admin.GameNotFound", "Game not found in inventory."));
            }

            var newKeys = dto.Keys.Select(key => new GameKey
            {
                GameIgdbId = igdbId,
                KeyValue = key,
                IsSold = false,
                GameInventory = gameInventory
            }).ToList();

            await _dbContext.GameKeys.AddRangeAsync(newKeys);
            await _dbContext.SaveChangesAsync();

            return Result<GameInventory>.Ok(gameInventory);
        }

        public async Task<Result<object>> DeleteGameAsync(int igdbId)
        {
            var gameInventory = await _dbContext.GamesInventory.FindAsync(igdbId);
            if (gameInventory == null)
            {
                return Result<object>.Fail(new Error("Admin.GameNotFound", "Game not found in inventory."));
            }

            _dbContext.GamesInventory.Remove(gameInventory);
            await _dbContext.SaveChangesAsync();

            return Result<object>.Ok(null);
        }
    }
}

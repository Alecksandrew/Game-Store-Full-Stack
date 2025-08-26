using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.Dtos.GetGameDetails;
using GameStoreAPI.Features.Games.Dtos.GetGameSummary;
using GameStoreAPI.Features.Games.GamesService;
using GameStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Games
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IIGDBService _igdbService;
        private readonly IGameService _gamesService;

        public GamesController(AppDbContext context, IIGDBService igdbService, IGameService gamesService)
        {
            _dbContext = context;
            _igdbService = igdbService;
            _gamesService = gamesService;
        }

        [HttpGet("{igdbId}")]
        public async Task<IActionResult> GetGameDetails(int igdbId)
        {
            var result = await _gamesService.GetGameDetailsAsync(igdbId);

            if (result.IsFailure)
            {
                if (result.Error.Code == "Game.NotFound")
                {
                    return NotFound(result.Error);
                }

                return BadRequest(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularGamesDetails([FromQuery][Range(1, 500, ErrorMessage = "The amount of games must be between 1 and 500.")] int amount)
        {         
           var result = await _gamesService.GetPopularGamesAsync(amount);

            if (result.IsFailure)
            {
                if (result.Error.Code == "Game.NotFound")
                {
                    return NotFound(result.Error);
                }

                return BadRequest(result.Error);
            }

            return Ok(result.Value);
        }


        [HttpGet("popular-summary")]
        public async Task<IActionResult> GetPopularGamesSummary(
            [FromQuery][Range(1, 100)] int page = 1,
            [FromQuery][Range(1, 50)] int pageSize = 12)
        {
            var result = await _gamesService.GetPopularGamesSummaryAsync(page, pageSize);

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchGames(
        [FromQuery, Required(ErrorMessage = "Search must not be empty.")] string name,
        [FromQuery, Range(1, 100)] int page = 1,
        [FromQuery, Range(1, 50)] int pageSize = 12
            )
        {
            var result = await _gamesService.SearchGamesByNameAsync(name, page, pageSize);

            if (result.IsFailure)
            {
                if (result.Error.Code == "Games.NotFound")
                {
                    return Ok(new List<GameSummaryResponseDto>());
                }
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
    }
}

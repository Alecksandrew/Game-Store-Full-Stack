using GameStoreAPI.Data;
using GameStoreAPI.Features.Games.Dtos.GetGame;
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

        /*========ENDPOINTS============*/

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


        [HttpGet]
        public async Task<IActionResult> GetGames([FromQuery] GetGamesRequestDto parameters)
        {
            if (parameters.YearFrom > parameters.YearTo)
            {
                return BadRequest("YearFrom cannot be greater than YearTo");
            }

            try
            {
                var result = await _gamesService.GetGamesAsync(parameters);
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error" });
            }
        }


     
       
    }
}

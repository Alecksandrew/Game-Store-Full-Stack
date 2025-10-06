using GameStoreAPI.Features.Admin.AdminService;
using GameStoreAPI.Features.Admin.Dtos.AddKeys;
using GameStoreAPI.Features.Admin.Dtos.UpdatePrice;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameStoreAPI.Features.Admin
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {

        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }


        [HttpGet("inventory")]
        public async Task<IActionResult> GetInventory([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null, [FromQuery] string? sortBy = null, [FromQuery] bool ascending = true)
        {
            var result = await _adminService.GetGamesInventoryAsync(page, pageSize, search, sortBy, ascending);
            return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
        }

        [HttpPatch("inventory/{igdbId}/price")]
        public async Task<IActionResult> UpdatePrice(int igdbId, [FromBody] UpdatePriceRequestDto dto)
        {
            var result = await _adminService.UpdateGamePriceAsync(igdbId, dto);
            return result.IsSuccess ? NoContent() : NotFound(result.Error);
        }


        [HttpPost("inventory/{igdbId}/keys")]
        public async Task<IActionResult> AddKeys(int igdbId, [FromBody] AddKeysRequestDto dto)
        {
            var result = await _adminService.AddGameKeysAsync(igdbId, dto);
            return result.IsSuccess ? Ok(new { message = $"{dto.Keys.Count} keys added successfully." }) : NotFound(result.Error);
        }

        [HttpDelete("inventory/{igdbId}")]
        public async Task<IActionResult> DeleteGame(int igdbId)
        {
            var result = await _adminService.DeleteGameAsync(igdbId);
            return result.IsSuccess ? NoContent() : NotFound(result.Error);
        }


    }
}

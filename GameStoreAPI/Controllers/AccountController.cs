using GameStoreAPI.Data;
using GameStoreAPI.Dtos;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Dtos.RefreshToken;
using GameStoreAPI.Models;
using GameStoreAPI.Services;
using GameStoreAPI.Services.AuthService;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace GameStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly AppDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;
        private readonly ITokenBlacklistService _tokenBlacklistService;
        private readonly IEmailService _emailService;


        public AccountController(
            IAuthService authService,
            RoleManager<IdentityRole> roleManager

            ) {
            _authService = authService;
            _roleManager = roleManager;
        }

       
       

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccount(RegisterAccountRequestDto req)
        {
            var (success, message, errors) = await _authService.RegisterAccountAsync(req);

            if (success)
            {
                return Ok(new { message });
            }
            else
            {
                return BadRequest(new { message, errors });
            }
             
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAccount(LoginAccountResquestDto req)
        {
            var (Success, Message, JwtToken, refreshToken) = await _authService.LoginAccountAsync(req);

            if (!Success) 
            {
                return Unauthorized(new { Message });
            }
            else
            {
                return Ok(new {Message, JwtToken, refreshToken });
            }      
        }


        [HttpPost("refresh")]
        [Authorize]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto req)
        {

            var (success, message, jwtToken, refreshToken) = await _authService.RefreshTokenAsync(req.refreshTokenReq);

            RefreshTokenResponseDto response = new RefreshTokenResponseDto { 
                success = success, 
                message = message, 
                jwtTokenRes = jwtToken, //null, if fails
                refreshTokenRes = refreshToken //null, if fails
            };

            return success ? Ok(response) : Unauthorized(response);
   
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogoutAccount()
        {
            //Revoke refresh tokens
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var refreshedToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(token => 
                 token.UserId == userId && !token.IsRevoked
                );

            if (refreshedToken == null) return Ok("User is already disconnected!");

            refreshedToken.IsRevoked = true;

            //Revoke JWT token
            var jti = User.FindFirstValue(JwtRegisteredClaimNames.Jti);

            var expClaim = User.FindFirstValue(JwtRegisteredClaimNames.Exp);
            if (!long.TryParse(expClaim, out var expValue)) return BadRequest("Invalid Error Format.");
            var expTime = DateTimeOffset.FromUnixTimeSeconds(expValue).UtcDateTime;

            await _tokenBlacklistService.BlacklistTokenAsync(jti, expTime);

            //
            await _dbContext.SaveChangesAsync();

            return Ok("User has been disconnected sucessfully.");


        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail( string emailToken, string userId)
        {
            if (userId == null) return BadRequest("This user doesnt exist");
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null) return NotFound();
         
            var result = await _userManager.ConfirmEmailAsync(user, emailToken);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            else
            {
                return Ok("Your email has been sucessfully confirmed");
            }
            


        }
    }
}

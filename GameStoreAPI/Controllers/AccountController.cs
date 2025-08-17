using GameStoreAPI.Data;
using GameStoreAPI.Dtos;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Models;
using GameStoreAPI.Services;
using GameStoreAPI.Services.AuthService;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
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
                return Ok(message);
            }
            else
            {
                return BadRequest(new { message, errors });
            }
             
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAccount(LoginAccountResquestDto req)
        {
            var user = await _userManager.FindByEmailAsync(req.Email);
            if (user == null) return Unauthorized("Email or password are invalid");

            var result = await _signInManager.CheckPasswordSignInAsync(user, req.Password, false); // This gonna check password and all of validations in dependency injection
            if (result.IsNotAllowed) return Unauthorized("You need to confirm your email!");
            if (!result.Succeeded) return Unauthorized("Email or password are invalid");

            var token = await GenerateJwtToken(user);

            var refreshToken = GenerateRefreshToken(user.Id);

            await _dbContext.RefreshTokens.AddAsync(refreshToken);
            await _dbContext.SaveChangesAsync();



            return Ok(new { token, refreshToken = refreshToken.Token });
        }


        [HttpPost("refresh")]
        [Authorize]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshTokenReq)
        {
            var refreshToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(r => r.Token == refreshTokenReq);
            if (refreshToken == null || refreshToken.ExpiryDate < DateTime.Now) 
            {
                return Unauthorized("Invalid refresh token");
            }

            //If someone steal a refresh token and try to use
            if (refreshToken.IsRevoked)
            {
                var userId = refreshToken.UserId;
                List<RefreshToken> userRefreshTokens = await _dbContext.RefreshTokens.Where(rT => rT.UserId == userId && rT.IsRevoked == false).ToListAsync();
                foreach (var userRefreshToken in  userRefreshTokens)
                {
                    userRefreshToken.IsRevoked = true;
                }

                await _dbContext.SaveChangesAsync();

                return Unauthorized("Session compromised. Please log in again");
            }

            var user = await _userManager.FindByIdAsync(refreshToken.UserId);
            if (user == null) return Unauthorized();

            refreshToken.IsRevoked = true;
            _dbContext.RefreshTokens.Update(refreshToken);

            var token = await GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken(user.Id);

            await _dbContext.RefreshTokens.AddAsync(newRefreshToken);
            await _dbContext.SaveChangesAsync();

            return Ok(new { token, refreshToken = newRefreshToken.Token });
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

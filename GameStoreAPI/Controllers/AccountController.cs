using GameStoreAPI.Data;
using GameStoreAPI.Dtos;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Models;
using GameStoreAPI.Services;
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
        private readonly AppDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ITokenBlacklistService _tokenBlacklistService;
        private readonly IEmailService _emailService;


        public AccountController(
            AppDbContext dbContext, 
            UserManager<IdentityUser> userManager, 
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            ITokenBlacklistService tokenBlacklistService,
            IEmailService emailService
            ) {
            _dbContext = dbContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _tokenBlacklistService = tokenBlacklistService;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        private async Task<string> GenerateJwtToken(IdentityUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, userRole),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccount(RegisterAccountRequestDto req)
        {
            var newUser = new IdentityUser
            {
                UserName = req.Username,
                Email = req.Email,
            };

            var result = await _userManager.CreateAsync(newUser, req.Password);


            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "User");
                
                var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                string BACKEND_URL = _configuration.GetValue<string>("ApplicationSettings:BackendUrl");
                string confirmationURL = $"{BACKEND_URL}/api/account/confirm-email?emailToken={emailToken}&userId={newUser.Id}";

                //Data to send in the confirmation email
                string userEmail = newUser.Email;
                string subject = "Confirmation email - Game Store";
                string htmlContext = $"<h1>Welcome to GameStore!</h1><p>Please, confirm your account by clicking on the link:</p><a href='{confirmationURL}'>Confirm your email</a>"; ;

                await _emailService.SendEmailAsync(userEmail, subject, htmlContext);

                
                return Ok("A confirmation email was sent to your account! Please, verify, then you will be able to login. DONT FORGET TO VERIFY YOUR SPAM BOX!");
            }
            else
            {
                return BadRequest(result.Errors);
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

            var refreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                UserId = user.Id,
                ExpiryDate = DateTime.UtcNow.AddDays(1) 
            };

            await _dbContext.RefreshTokens.AddAsync(refreshToken);
            await _dbContext.SaveChangesAsync();



            return Ok(new { token, refreshToken = refreshToken.Token });
        }


        [HttpPost("refresh")]
        [Authorize]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshTokenReq)
        {
            var refreshToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(r => r.Token == refreshTokenReq);
            if (refreshToken == null
                || refreshToken.ExpiryDate < DateTime.Now
                || refreshToken.IsRevoked) 
            {
                return Unauthorized("Invalid refresh token");
            }

            var user = await _userManager.FindByIdAsync(refreshToken.UserId);
            if (user == null) return Unauthorized();

            refreshToken.IsRevoked = true;
            _dbContext.RefreshTokens.Update(refreshToken);

            var token = await GenerateJwtToken(user);
            var newRefreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                UserId = user.Id,
                ExpiryDate = DateTime.UtcNow.AddDays(1)
            };

            await _dbContext.RefreshTokens.AddAsync(newRefreshToken);
            await _dbContext.SaveChangesAsync();

            return Ok(new { token, refreshToken = newRefreshToken.Token });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
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

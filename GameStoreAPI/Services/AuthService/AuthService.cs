using GameStoreAPI.Data;
using GameStoreAPI.Dtos;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Models;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GameStoreAPI.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ITokenBlacklistService _tokenBlacklistService;
        private readonly IEmailService _emailService;


        public AuthService(
            AppDbContext dbContext,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            ITokenBlacklistService tokenBlacklistService,
            IEmailService emailService
            )
        {
            _dbContext = dbContext;
            _userManager = userManager;
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
        private RefreshToken GenerateRefreshToken(string userId)
        {
            return new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                UserId = userId,
                ExpiryDate = DateTime.UtcNow.AddDays(1)
            };
        }
        private async Task SendConfirmationEmailAsync(IdentityUser user)
        {
            var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            string BACKEND_URL = _configuration.GetValue<string>("ApplicationSettings:BackendUrl");
            string confirmationURL = $"{BACKEND_URL}/api/account/confirm-email?emailToken={emailToken}&userId={user.Id}";

            string subject = "Confirmation email - Game Store";
            string htmlContext = $"<h1>Welcome to GameStore!</h1><p>Please, confirm your account by clicking on the link:</p><a href='{confirmationURL}'>Confirm your email</a>";

            await _emailService.SendEmailAsync(user.Email, subject, htmlContext);
        }

        public async Task<(bool success, string message, IEnumerable<IdentityError>? errors)> RegisterAccountAsync(RegisterAccountRequestDto req)
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

                await SendConfirmationEmailAsync(newUser);

                return (
                    true,
                    "A confirmation email was sent to your account! Please, verify, then you will be able to login. DONT FORGET TO VERIFY YOUR SPAM BOX!",
                    null);
            }
            else
            {
                return (
                    false,
                    "User register has failed",
                    result.Errors);
            }
        }

        public async Task<(bool Success, string Message, string? JwtToken, string? RefreshToken)> LoginAccountAsync(LoginAccountResquestDto req)
        {
            var user = await _userManager.FindByEmailAsync(req.Email);
            if (user == null) return (false, "Email or password are invalid", null, null);

            var result = await _signInManager.CheckPasswordSignInAsync(user, req.Password, false); // This gonna check password and all of validations in dependency injection
            if (result.IsNotAllowed) return (false, "You need to confirm your email!", null, null);
            if (!result.Succeeded) return (false, "Email or password are invalid", null, null);

            var jwtToken = await GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken(user.Id);

            await _dbContext.RefreshTokens.AddAsync(refreshToken);
            await _dbContext.SaveChangesAsync();

            return (true, "You login in your account successfully", jwtToken, refreshToken.Token);
        }
    }
}

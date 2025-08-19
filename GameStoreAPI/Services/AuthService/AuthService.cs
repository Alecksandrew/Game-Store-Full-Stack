using GameStoreAPI.Data;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Dtos.LoginAccount;
using GameStoreAPI.Dtos.ResetPassword;
using GameStoreAPI.Models;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


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
        private async Task SendPasswordResetEmailAsync(IdentityUser user)
        {
            string origin = _configuration["ApplicationSettings:FrontendUrl"];
            if (string.IsNullOrEmpty(origin))throw new Exception("FrontendUrl não está configurado no servidor.");

            var resetPasswordToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetUrl = $"{origin}/reset-password?token={Uri.EscapeDataString(resetPasswordToken)}&email={Uri.EscapeDataString(user.Email)}";//url to get back to front end

            string subject = "Update Password - Game Store";
            string htmlContent = $"<h1>Update your password</h1><p>Please, click on the link to change your password</p><a href='{resetUrl}'>Change Password</a>";

            await _emailService.SendEmailAsync(user.Email, subject, htmlContent);
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
                    "One or more validation errors occurred when registering user.",
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

        public async Task<(bool Success, string Message, string? JwtToken, string? RefreshToken)> RefreshTokenAsync(string refreshTokenReq)
        {
            var refreshToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(r => r.Token == refreshTokenReq);
            if (refreshToken == null || refreshToken.ExpiryDate < DateTime.Now)
            {
                return (false, "Invalid refresh token", null, null);
            }

            //If someone steal a refresh token and try to use
            if (refreshToken.IsRevoked)
            {
                var userId = refreshToken.UserId;
                List<RefreshToken> userRefreshTokens = await _dbContext.RefreshTokens.Where(rT => rT.UserId == userId && rT.IsRevoked == false).ToListAsync();
                foreach (var userRefreshToken in userRefreshTokens)
                {
                    userRefreshToken.IsRevoked = true;
                }

                await _dbContext.SaveChangesAsync();

                return (false, "Session compromised. Please log in again", null, null);
            }

            var user = await _userManager.FindByIdAsync(refreshToken.UserId);
            if (user == null) return (false, "User not found", null, null);

            refreshToken.IsRevoked = true;
            _dbContext.RefreshTokens.Update(refreshToken);

            var token = await GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken(user.Id);

            await _dbContext.RefreshTokens.AddAsync(newRefreshToken);
            await _dbContext.SaveChangesAsync();

            return (true, "You refreshed your token successfully", token, newRefreshToken.Token);
        }

        public async Task<(bool success, string message)> LogoutAccountAsync(string userId, string jti, string exp)
        {
            //Revoke refresh tokens
            var refreshToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(token =>
                token.UserId == userId && !token.IsRevoked
            );

            if (refreshToken == null) return (true, "User is already disconnected!");

            refreshToken.IsRevoked = true;

            //Revoke JWT token
            if (!long.TryParse(exp, out var expValue))
            {
                return (false, "Invalid token expiration format.");
            }
            var expTime = DateTimeOffset.FromUnixTimeSeconds(expValue).UtcDateTime;

            await _tokenBlacklistService.BlacklistTokenAsync(jti, expTime);

            //
            await _dbContext.SaveChangesAsync();

            return (true, "User has been disconnected successfully.");
        }

        public async Task<(EmailConfirmationStatus status, IEnumerable<IdentityError>? errors)> ConfirmEmailAsync(string userId, string emailToken)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(emailToken))
            {
                return (EmailConfirmationStatus.Failure, null);
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return (EmailConfirmationStatus.UserNotFound, null);
            }

            var result = await _userManager.ConfirmEmailAsync(user, emailToken);

            return result.Succeeded ? (EmailConfirmationStatus.Success, null) : (EmailConfirmationStatus.InvalidToken, result.Errors);
        }

        public async Task<string> ForgotPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return "A link to reset your password was sent to your email!"; //Message in order to improve security
            
            await SendPasswordResetEmailAsync(user);

            return "A link to reset your password was sent to your email!";
        }
        public async Task<(bool success, string message, IEnumerable<IdentityError>? errors)> ResetPasswordAsync(ResetPasswordRequestDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null || !await _userManager.IsEmailConfirmedAsync(user))
            {
                return (false, "Fail when updating password", null);
            };

            var result = await _userManager.ResetPasswordAsync(user, dto.Token, dto.NewPassword);

            return (
                result.Succeeded 
                ? (true, "Your password was updated successfully", null) 
                : (false, "Fail when updating password", result.Errors)
            );

        }
    }
}

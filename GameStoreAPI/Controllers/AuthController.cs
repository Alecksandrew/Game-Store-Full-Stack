using GameStoreAPI.Data;
using GameStoreAPI.Dtos.ConfirmEmail;
using GameStoreAPI.Dtos.CreateAccount;
using GameStoreAPI.Dtos.CreateUser;
using GameStoreAPI.Dtos.ForgotPassword;
using GameStoreAPI.Dtos.LoginAccount;
using GameStoreAPI.Dtos.LogoutAccount;
using GameStoreAPI.Dtos.RefreshToken;
using GameStoreAPI.Dtos.ResetPassword;
using GameStoreAPI.Models;
using GameStoreAPI.Services;
using GameStoreAPI.Services.AuthService;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GameStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) {
            _authService = authService;
        }

       
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccount(RegisterAccountRequestDto req)
        {
            var (success, message, errors) = await _authService.RegisterAccountAsync(req);

            RegisterAccountResponseDto response = new RegisterAccountResponseDto
            {
                Message = message,
                Errors = errors
            };

            return success ? Ok(response) : BadRequest(response);
                
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAccount(LoginAccountResquestDto req)
        {
            var (Success, Message, JwtToken, refreshToken) = await _authService.LoginAccountAsync(req);

            LoginAccountResponseDto response = new LoginAccountResponseDto
            {
                message = Message,
                jwtTokenRes = JwtToken,//null, if fails
                refreshTokenRes = refreshToken, //null, if fails
            };

            return Success ? Ok(response) : Unauthorized(response);
        }

        [HttpPost("refresh")]
        [Authorize]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto req)
        {

            var (success, message, jwtToken, refreshToken) = await _authService.RefreshTokenAsync(req.refreshTokenReq);

            RefreshTokenResponseDto response = new RefreshTokenResponseDto {  
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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jti = User.FindFirstValue(JwtRegisteredClaimNames.Jti);
            var expClaim = User.FindFirstValue(JwtRegisteredClaimNames.Exp);

            LogoutAccountResponseDto response = new LogoutAccountResponseDto
            {
                message = ""
            };

            if ( userId == null || jti == null || expClaim == null)
            {
                response.message = "Invalid Token";
                return Unauthorized(response);
            }

            var (success, message) = await _authService.LogoutAccountAsync(userId, jti, expClaim);

            response.message = message;

            return success ? Ok(response) : BadRequest(response);
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string emailToken, string userId /*they come from params*/ )
        {
            var (status, errors) = await _authService.ConfirmEmailAsync(userId, emailToken);

            ConfirmEmailResponseDto response = new ConfirmEmailResponseDto
            {
                message = "",
                errors = errors
            };

            switch (status)
            {
                case EmailConfirmationStatus.UserNotFound:
                    {
                        response.message = "User not found";
                        return NotFound(response);
                    }
                case EmailConfirmationStatus.InvalidToken: 
                    {
                        response.message = "This is a invalid token";
                        return BadRequest(response);
                    }
                case EmailConfirmationStatus.Failure:
                    {
                        response.message = "Request has failed. Verify the parameters!";
                        return BadRequest(response);
                    }   
                case EmailConfirmationStatus.Success:
                    {
                        response.message = "Your email has been confirmed successfully";
                        return Ok(response);
                    }
                default:
                    {
                        response.message = "An unexpected error occurred when trying to confirm user email.";
                        return StatusCode(500, response);
                    }      
            }
            ;    
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto req)
        {
            string message = await _authService.ForgotPasswordAsync(req.Email);

            ForgotPasswordResponseDto response = new ForgotPasswordResponseDto
            {
                message = message
            };

            return Ok(response);
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequestDto req)
        {
            var (success, message, errors) = await _authService.ResetPasswordAsync(req);

            ResetPasswordResponseDto response = new ResetPasswordResponseDto
            {
                message = message,
                errors = errors
            };

            return success ? Ok(response) : BadRequest(response);
        
        }

    }
}

using GameStoreAPI.Data;
using GameStoreAPI.Services;
using GameStoreAPI.Services.AccountService;
using GameStoreAPI.Services.AuthService;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {          
            ValidateIssuerSigningKey = true,       
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                var blacklistService = context.HttpContext.RequestServices.GetRequiredService<ITokenBlacklistService>();
                var jti = context.Principal?.FindFirstValue(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti);

                if (!string.IsNullOrEmpty(jti) && await blacklistService.IsTokenBlacklistedAsync(jti))
                {
                    context.Fail("Token has been revoked.");
                }
            }
        };
    });

//Blacklist JWT token
builder.Services.AddMemoryCache();
builder.Services.AddScoped<ITokenBlacklistService, MemoryCacheTokenBlacklistService>();


builder.Services.AddScoped<IEmailService, SendGridEmailService>();

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddControllers();


var app = builder.Build();

//Add admin in database
using (var scope = app.Services.CreateScope())
{
    await DatabaseSeeder.SeedAsync(scope.ServiceProvider, app.Configuration);
}



app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

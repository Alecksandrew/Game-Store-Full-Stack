using GameStoreAPI.Data;
using GameStoreAPI.Features.Authentication.AuthService;
using GameStoreAPI.Features.Games.GamesService;
using GameStoreAPI.Features.MyAccount.AccountService;
using GameStoreAPI.Features.Reviews.ReviewsService;
using GameStoreAPI.Services;
using GameStoreAPI.Services.EmailService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173", "https://localhost:5173") 
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      });
});

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

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
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

builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient("IGDB", client =>
{
    var igdbConfig = builder.Configuration.GetSection("IGDB");
    var apiUrl = igdbConfig["ApiUrl"];

    if (string.IsNullOrEmpty(apiUrl))
    {
        throw new InvalidOperationException("IGDB api url was not found in settings");
    }

    client.BaseAddress = new Uri(apiUrl);
});

builder.Services.AddScoped<IIGDBService, IGDBService>();

builder.Services.AddScoped<IGameService, GameService>();

builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase); // Allow better comunication between front and backend:
                                                                                                                                  // JSON arrives CamelCase -> PascalCase
                                                                                                                                  // JSON go back PascalCase -> CamelCase
//Review dependency
builder.Services.AddScoped<IReviewsService, ReviewsService>();

var app = builder.Build();

//Add admin in database
using (var scope = app.Services.CreateScope())
{
    await DatabaseSeeder.SeedAsync(scope.ServiceProvider, app.Configuration);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();           
    app.UseSwaggerUI();  
}



app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

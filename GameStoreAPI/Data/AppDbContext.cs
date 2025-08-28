using GameStoreAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<GameInventory> GamesInventory { get; set; }
        public DbSet<GameKey> GameKeys { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Token)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(e => e.UserId)
                      .IsRequired();

                entity.Property(e => e.ExpiryDate)
                      .IsRequired();

                entity.Property(e => e.IsRevoked)
                      .IsRequired();

                entity.HasOne<IdentityUser>()
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<GameInventory>(entity =>
            {
                entity.HasKey(e => e.IgdbId);
                entity.Property(e => e.IgdbId).ValueGeneratedNever();
                entity.Property(e => e.Price).HasPrecision(6, 2);
                entity.Property(e => e.DiscountPrice).HasPrecision(6, 2);
            });
        }


    }
}

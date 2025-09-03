using GameStoreAPI.Models;
using GameStoreAPI.Models.Interfaces;
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
        public DbSet<Review> Reviews { get; set; }

        //CreatedAt and UpdatedAt properties will be always created when save in database automatically
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<IAuditable>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.LastUpdatedAt = null;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.LastUpdatedAt = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries<IAuditable>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.LastUpdatedAt = null; 
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.LastUpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }


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

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.IgdbId)
                      .IsRequired();

                entity.HasOne(e => e.GameInventory)
                      .WithMany()
                      .HasForeignKey(e => e.IgdbId)
                      .OnDelete(DeleteBehavior.NoAction); 


                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.NoAction); ;

                entity.Property(e => e.Rating)
                      .IsRequired()
                      .HasPrecision(2, 1);

                entity.Property(e => e.Description)
                      .HasMaxLength(1000);

                entity.Property(r => r.CreatedAt)
                      .IsRequired();
            

            });
            modelBuilder.Entity<Review>()
                        .ToTable("Reviews", t =>
                        t.HasCheckConstraint("CK_Review_Rating_Increments",
                        "[Rating] >= 0.5 AND [Rating] <= 5.0 AND ([Rating] * 2) = CAST(([Rating] * 2) AS INT)"));
        }


    }
}

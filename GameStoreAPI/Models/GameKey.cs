using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStoreAPI.Models
{
    public class GameKey
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public long GameIgdbId { get; set; }
        public required string KeyValue { get; set; } //Simulating game key to buy
        public bool IsSold { get; set; } = false;

        public string? UserId { get; set; }
        public IdentityUser? User { get; set; }

        public GameInventory GameInventory { get; set; }
    }
}

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStoreAPI.Models
{
    public class WishlistedGame
    {
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public IdentityUser User { get; set; }

        [ForeignKey("IgdbId")]
        public int IgdbId { get; set; }
        public GameInventory GameInventory { get; set; }
        
        public DateTime CreatedAt { get; set; }

    }
}

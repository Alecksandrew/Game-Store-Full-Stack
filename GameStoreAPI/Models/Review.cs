using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStoreAPI.Models
{
 
    public class Review
    {
     
        public Guid Id { get; set; } = Guid.NewGuid();
     
        //foreign key
        public int GameIgdbId { get; set; }
        public GameInventory GameInventory { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public IdentityUser User { get; set; }

  
        //Ratings can only be 0.5, 1, 1.5...
        [Range(0.5, 5.0, ErrorMessage = "Rating must be between 0.5 and 5.0.")]
        public double Rating { get; set; }

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }

}

using GameStoreAPI.Models.Interfaces;
using GameStoreAPI.Shared.Validation;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStoreAPI.Models
{
 
    public class Review: IAuditable
    {
     
        public int Id { get; set; }
     
        //foreign key
        public int IgdbId { get; set; }
        public GameInventory GameInventory { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public IdentityUser User { get; set; }


        //Ratings can only be 0.5, 1, 1.5...
        [IsZeroPointFiveMultipleAttribute]
        public double Rating { get; set; }

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }

    }

}

using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Models
{
    public class GameInventory
    {
        [Key]
        public int IgdbId { get; set; } //KEY FROM IGDB
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; } = 0; 
        public int TotalSells { get; set; } = 0; 
        public ICollection<GameKey> GameKeys { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Admin.Dtos.UpdatePrice
{
    public class UpdatePriceRequestDto
    {
        [Required]
        [Range(0, 9999.99)]
        public decimal Price { get; set; }

        [Range(0, 9999.99)]
        public decimal DiscountPrice { get; set; }
    }
}

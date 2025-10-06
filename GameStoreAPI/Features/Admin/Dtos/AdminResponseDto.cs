namespace GameStoreAPI.Features.Admin.Dtos
{
    public class AdminResponseDto
    {
        public int IgdbId { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
        public int TotalKeys { get; set; }
        public int AvailableKeys { get; set; }
    }
}

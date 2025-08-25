namespace GameStoreAPI.Features.Games.Dtos.GetGame
{
    public class GetGameResponseDto
    {
        public required string IgdbId { get; set; }
        public required string Name { get; set; }
        public required string Price { get; set; }
        public string DiscountPrice { get; set; }

    }
}

namespace GameStoreAPI.Features.Games.Dtos.GetGameDetails
{
    public class GameDetailsResponseDto
    {
        //From IGDB
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Summary { get; set; }
        public long? FirstReleaseDate { get; set; }
        public int CoverImageId { get; set; }
        public List<string> ScreenshotsImageUrl { get; set; }
        public List<string>? Platforms { get; set; }
        public List<string>? Videos { get; set; }

        //From local database
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
        public int TotalSells { get; set; }
        public int AvailableKeysStock { get; set; }
    }
}

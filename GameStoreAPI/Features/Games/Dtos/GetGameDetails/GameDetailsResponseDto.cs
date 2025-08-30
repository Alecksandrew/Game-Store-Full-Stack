using System.Text.Json.Serialization;

namespace GameStoreAPI.Features.Games.Dtos.GetGameDetails
{
    public class GameDetailsResponseDto
    {
        //From IGDB
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Summary { get; set; }
        public List<string> Genres { get; set; }
        public string? FirstReleaseDate { get; set; }
        public string CoverUrl { get; set; }
        public List<string> ScreenshotsImageUrl { get; set; }
        public List<string>? Platforms { get; set; }
        public List<string>? Videos { get; set; }
        public InvolvedCompanies? InvolvedCompanies { get; set; }
        public List<string>? GameModes { get; set; }

        //From local database
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
        public int TotalSells { get; set; }
        public int AvailableKeysStock { get; set; }
    }

    public class InvolvedCompanies
    {
        public List<string> Developers { get; set; } = [];
        public List<string> Publishers { get; set; } = [];
    }
}

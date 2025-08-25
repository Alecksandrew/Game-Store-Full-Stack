

namespace GameStoreAPI.Features.Games.Dtos.GetGameDetails
{
    public class GameDetailsResponseIGDBDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Summary { get; set; }
        public long? FirstReleaseDate { get; set; }
        public int CoverImageId { get; set; }
        public List<IgdbScreenshotDto> ScreenshotsImageId { get; set; }
        public List<IgdbPlatformDto>? Platforms { get; set; }
        public List<IgdbVideoDto>? Videos { get; set; }
    }

    public class IgdbPlatformDto
    {
        public string Name { get; set; }
    }

    public class IgdbScreenshotDto
    {
        public string Image_Id { get; set; }
    }

    public class IgdbVideoDto
    {
        public string Video_Id { get; set; }
    }
}

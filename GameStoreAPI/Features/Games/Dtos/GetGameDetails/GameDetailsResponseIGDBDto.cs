using System.Text.Json.Serialization;

// Substitua todo o seu arquivo de DTO por este código

public class GameDetailsResponseIGDBDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("summary")]
    public string? Summary { get; set; }

    [JsonPropertyName("first_release_date")]
    public long? FirstReleaseDate { get; set; }

    [JsonPropertyName("cover")]
    public IgdbCoverDto? Cover { get; set; }

    [JsonPropertyName("screenshots")]
    public List<IgdbScreenshotDto>? Screenshots { get; set; }

    [JsonPropertyName("platforms")]
    public List<IgdbPlatformDto>? Platforms { get; set; }

    [JsonPropertyName("videos")]
    public List<IgdbVideoDto>? Videos { get; set; }

    [JsonPropertyName("genres")]
    public List<IgdbGenreDto>? Genres { get; set; }

    [JsonPropertyName("involved_companies")]
    public List<IgdbInvolvedCompanyDto>? InvolvedCompanies { get; set; }

    [JsonPropertyName("game_modes")]
    public List<GameMode>? GameModes { get; set; }

}

public class GameMode
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
}

public class IgdbInvolvedCompanyDto
{
    [JsonPropertyName("company")]
    public Company Company { get; set; }
    [JsonPropertyName("developer")]
    public bool Developer { get; set; }
    [JsonPropertyName("publisher")]
    public bool Publisher { get; set; }
}
public class Company
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }
}
public class IgdbCoverDto
{
    [JsonPropertyName("image_id")]
    public string? ImageId { get; set; }
}

public class IgdbPlatformDto
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }
}

public class IgdbScreenshotDto
{
    [JsonPropertyName("image_id")]
    public string? ImageId { get; set; }
}

public class IgdbVideoDto
{
    [JsonPropertyName("video_id")]
    public string? VideoId { get; set; }
}

public class IgdbGenreDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }
}
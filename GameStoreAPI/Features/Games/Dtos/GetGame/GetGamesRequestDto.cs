using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Games.Dtos.GetGame
{
    public class GetGamesRequestDto
    {
        public string SortBy { get; set; } = "popularity";
        public string? Search { get; set; }

        public string? Genre { get; set; }

        public string? Platform { get; set; }

        public bool Detailed { get; set; } = false;

        [Range(1, 100)]
        public int Page { get; set; } = 1;

        [Range(1, 50)]
        public int PageSize { get; set; } = 12;

        [Range(1, 500)]
        public int? Limit { get; set; }

        public string? Rating { get; set; }

        [Range(1970, 2030)]
        public int? YearFrom { get; set; }

        [Range(1970, 2030)]
        public int? YearTo { get; set; }

    }
}

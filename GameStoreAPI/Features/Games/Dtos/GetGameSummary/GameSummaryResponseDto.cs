namespace GameStoreAPI.Features.Games.Dtos.GetGameSummary
{

        public class GameSummaryResponseDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string CoverUrl { get; set; }
            public decimal Price { get; set; }
            public decimal DiscountPrice { get; set; }
    }
    
}

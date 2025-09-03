namespace GameStoreAPI.Features.Reviews.Dto.CreateReviewByGame
{
    public class CreateReviewByGameResponseDto
    {
        public int Id { get; set; }
        public double Rating { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; }
    }
}

namespace GameStoreAPI.Shared.Dtos
{
    public class PaginatedResponseDto<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}

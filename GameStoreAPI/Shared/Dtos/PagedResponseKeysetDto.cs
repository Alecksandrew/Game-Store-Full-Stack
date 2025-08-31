namespace GameStoreAPI.Shared.Dtos
{

    public record PagedResponseDto<T>(List<T> Data, PageCursorDto? NextCursor);
    public record PageCursorDto(DateTime LastCreatedAt, int LastId);

}

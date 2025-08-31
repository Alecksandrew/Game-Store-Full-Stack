namespace GameStoreAPI.Shared
{
    public record PagedResponseKeyset<T>
    {
        public int Reference;
        public List<T> Data;

        public PagedResponseKeyset(List<T> data, int reference)
        {
            Data = data;
            Reference = reference;
        }
    }
}

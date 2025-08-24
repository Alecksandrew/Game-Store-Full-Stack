namespace GameStoreAPI.Features.Games.GamesService
{
    public interface IIGDBService
    {

        Task<string> GetValidApiToken();
    }
}

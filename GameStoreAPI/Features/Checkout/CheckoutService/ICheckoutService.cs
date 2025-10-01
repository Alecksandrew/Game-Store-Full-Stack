using GameStoreAPI.Features.Checkout.Dtos;
using GameStoreAPI.Shared;

namespace GameStoreAPI.Features.Checkout.CheckoutService
{
    public interface ICheckoutService
    {
        Task<Result<object>> ProcessCheckoutAsync(CheckoutRequestDto request, string userId);
    }
}

using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Checkout.Dtos
{
    public class CheckoutRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public CreditCardDto CardDetails { get; set; }

        [Required]
        public List<int> GameIds { get; set; }
    }

    public class CreditCardDto
    {
        [Required]
        [CreditCard]
        public string CardNumber { get; set; }

        [Required]
        public string ExpiryDate { get; set; }

        [Required]
        public string Cvc { get; set; }
    }
}

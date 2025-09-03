using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Shared.Validation
{
    public class IsZeroPointFiveMultipleAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is double numero)
            {
                if (numero < 0.5 || numero > 5)
                {
                    return new ValidationResult(GetErrorMessage());
                }

                if ((numero * 2) % 1 == 0)
                {
                    return ValidationResult.Success;
                }
            }

            return new ValidationResult(GetErrorMessage());
        }
        public string GetErrorMessage() => "The value must be a multiple of 0.5, from 0.5 to 5.0.";
    }
}
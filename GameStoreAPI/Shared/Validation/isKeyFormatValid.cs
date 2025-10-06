using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace GameStoreAPI.Shared.Validation
{
    public class isKeyFormatValid : ValidationAttribute
    {
        // Regex para validar o formato FAKE-{GUID}
        private const string GameKeyPattern = @"^FAKE-[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$";

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is not List<string> keys)
            {
                return new ValidationResult("Invalid data type for keys.");
            }

            var regex = new Regex(GameKeyPattern);

            foreach (var key in keys)
            {
                if (string.IsNullOrWhiteSpace(key) || !regex.IsMatch(key.Trim()))
                {
                    return new ValidationResult($"The key '{key}' is not in the required format 'FAKE-{{GUID}}'.");
                }
            }

            return ValidationResult.Success;
        }
    }
}

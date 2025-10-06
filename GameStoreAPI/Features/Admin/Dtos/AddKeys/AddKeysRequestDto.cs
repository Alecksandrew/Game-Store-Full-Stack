using GameStoreAPI.Shared.Validation;
using System.ComponentModel.DataAnnotations;

namespace GameStoreAPI.Features.Admin.Dtos.AddKeys
{
    public class AddKeysRequestDto
    {
        [Required]
        [MinLength(1, ErrorMessage = "At least one key must be provided.")]
        [isKeyFormatValid]
        public List<string> Keys { get; set;}
    }
}

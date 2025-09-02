using GameStoreAPI.Models;
using GameStoreAPI.Shared.Validation;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStoreAPI.Features.Reviews.Dto.GetMyReviewByGame
{
    public class GetMyReviewByGameResponseDto
    {

        public int Id { get; set; }

        public string UserName { get; set; }

        //Ratings can only be 0.5, 1, 1.5...
        [IsZeroPointFiveMultipleAttribute]
        public double Rating { get; set; }

        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? LastUpdatedAt { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using PawFund.Data.Models;

namespace PawFund.Business.DTOs
{

    public class PetCreateDto
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [StringLength(10)]
        public string Species { get; set; }
        [Required]
        [StringLength(10)]
        public string Breed { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [StringLength(10)]
        public string Gender { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        [StringLength(100)]
        public string ImageUrl { get; set; }
        [Required]
        public int ShelterId { get; set; }
    }
    
    public class PetUpdateDto
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [StringLength(10)]
        public string Species { get; set; }
        [Required]
        [StringLength(10)]
        public string Breed { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [StringLength(10)]
        public string Gender { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        [StringLength(1000)]
        public string ImageUrl { get; set; }
        public AdoptionStatus Status { get; set; }
        [Required]
        public int ShelterId { get; set; }
    }

    public class PetResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public AdoptionStatus Status { get; set; }
        public int ShelterId { get; set; }
    }
}
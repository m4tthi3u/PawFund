using System.Text.Json.Serialization;
using PawFund.Data.Models;

namespace PawFund.Presentation.DTOs
{

    public class PetCreateDto
    {
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ShelterId { get; set; }
    }
    
    public class PetUpdateDto
    {
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
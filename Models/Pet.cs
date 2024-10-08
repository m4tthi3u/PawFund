using System.ComponentModel.DataAnnotations;

namespace PawFund.Models
{
    public class Pet
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Species { get; set; }

        [Required]
        public string Breed { get; set; }

        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public bool IsAdopted { get; set; }

        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }
    }
}

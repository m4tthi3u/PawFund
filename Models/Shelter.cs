using System.ComponentModel.DataAnnotations;

namespace PawFund.Models
{
    public class Shelter
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public List<Pet> Pets { get; set; }
    }
}

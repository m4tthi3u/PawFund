using System.ComponentModel.DataAnnotations;

namespace PawFund.Models
{
    public class Donation
    {
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime DonationDate { get; set; }

        public int? PetId { get; set; }
        public Pet Pet { get; set; }

        public int? ShelterId { get; set; }
        public Shelter Shelter { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}

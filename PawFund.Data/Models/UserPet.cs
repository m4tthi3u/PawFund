using PawFund.Data.Models;

namespace PawFund.Data.Models
{
    public class UserPet
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PetId { get; set; }
        public DateTime AdoptionDate { get; set; }
        public AdoptionStatus Status { get; set; } 

        public User User { get; set; }
        public Pet Pet { get; set; }
    }
}
using PawFund.Data.Models;

namespace PawFund.Business.DTOs
{
    public class UserPetDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PetId { get; set; }
        public DateTime AdoptionDate { get; set; }
        public AdoptionStatus Status { get; set; }
        public UserResponseDto User { get; set; }
        public PetResponseDto Pet { get; set; }
    }
}
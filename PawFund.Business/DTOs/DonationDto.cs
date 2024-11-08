using PawFund.Data.Models;

namespace PawFund.Business.DTOs
{
    public class DonationCreateDto
    {
        public int UserId { get; set; }
        public int? ShelterId { get; set; }
        public int PetId { get; set; }
        public string PetName { get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }

    public class DonationUpdateDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DonationStatus Status { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }

    public class DonationResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? ShelterId { get; set; }
        public int PetId { get; set; }
        public string PetName { get; set; }
        public decimal Amount { get; set; }
        public DateTime DonationDate { get; set; }
        public DonationStatus Status { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}
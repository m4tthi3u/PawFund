using System.ComponentModel.DataAnnotations;
using PawFund.Data.Models;

namespace PawFund.Business.DTOs
{
    public class DonationCreateDto
    {
        [Required]
        public int UserId { get; set; }
        public int? ShelterId { get; set; }
        [Required]
        public int PetId { get; set; }
        [Required]
        public string PetName { get; set; }
        [Range(0,1000)]
        public decimal Amount { get; set; }
        [Required]
        public PaymentMethod PaymentMethod { get; set; }
    }

    public class DonationUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Range(0, 10000)]
        public decimal Amount { get; set; }
        [Required]
        public DonationStatus Status { get; set; }
        [Required]
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
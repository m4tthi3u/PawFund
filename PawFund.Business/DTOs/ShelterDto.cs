using System.ComponentModel.DataAnnotations;

namespace PawFund.Business.DTOs
{

    public class ShelterCreateDto
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [StringLength(30)]
        public string Address { get; set; }
        [Required]
        [StringLength(11)]
        public string PhoneNumber { get; set; }
        [Required]
        [StringLength(30)]
        public string Email { get; set; }
    }

    public class ShelterResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
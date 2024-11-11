using System.ComponentModel.DataAnnotations;

namespace PawFund.Business.DTOs
{

    public class EventCreateDto
    {
        [Required]
        [StringLength(30)]
        public string Title { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [StringLength(30)]
        public string Location { get; set; }
        [Required]
        public int ShelterId { get; set; }
    }

    public class EventResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Location { get; set; }
        public int ShelterId { get; set; }
    }
}
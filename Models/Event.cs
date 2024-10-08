using System.ComponentModel.DataAnnotations;

namespace PawFund.Models
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Location { get; set; }

        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }
    }
}

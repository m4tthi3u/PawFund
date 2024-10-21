using NpgsqlTypes;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace PawFund.Core.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public AdoptionStatus Status { get; set; }
        public int ShelterId { get; set; }
    }
    public enum AdoptionStatus
    {
        
        Available,
       
        Pending,
       
        Adopted
    }
}

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace PawFund.Data.Models
{

    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public AdoptionStatus Status { get; set; }
        public int ShelterId { get; set; }
    }
    
    [JsonConverter(typeof(JsonStringEnumConverter<AdoptionStatus>))]
    public enum AdoptionStatus 
    {
        Aprroved,
        Available,
        Pending,
        Adopted
    }
}

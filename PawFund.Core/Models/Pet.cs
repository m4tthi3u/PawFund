using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public string Status { get; set; }
        public int ShelterId { get; set; }
    }

    // will consider late, because idk how to implement this, we use string instead, I guess.
    //public enum AdoptionStatus 
    //{
    //    Available,
    //    Pending,
    //    Adopted
    //}
}

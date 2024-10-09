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
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Status { get; set; } = "Available"; // default is available, we can change it later if needed
        public DateTime DateAdded { get; set; }
        public string AdopterName { get; set; } = null; // Adopters can  be anonymous, people don't like to share their names due to privacy concerns

        public void MarkAsAdopted(string adopterName)
        {
            Status = "Adopted";
            AdopterName = adopterName;
        }
    }
}

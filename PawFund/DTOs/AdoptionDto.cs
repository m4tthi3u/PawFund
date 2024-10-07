using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.API.DTOs
{
    public class AdoptionDto
    {
        public int PetId { get; set; }
        public string PetName { get; set; }
        public string AdopterName { get; set; }
        public DateTime AdoptionDate { get; set; }
    }
}

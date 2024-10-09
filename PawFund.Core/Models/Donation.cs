using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Models
{
    public class Donation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? ShelterId { get; set; }

        public int PetId { get; set; }
        public decimal Amount { get; set; }
        public DateTime DonationDate { get; set; }
    }
}

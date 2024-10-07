using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.API.DTOs
{
    public class DonationDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string DonorName { get; set; }
        public string Message { get; set; }
        public DateTime DonationDate { get; set; }
    }
}

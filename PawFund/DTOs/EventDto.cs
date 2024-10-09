using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.API.DTOs
{
    public class EventDto
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Location { get; set; }
        public DateTime EventDate { get; set; }
        public string Description { get; set; }
    }
}

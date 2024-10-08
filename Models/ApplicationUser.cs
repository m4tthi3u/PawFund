using Microsoft.AspNetCore.Identity;

namespace PawFund.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Donation> Donations { get; set; }
    }
}

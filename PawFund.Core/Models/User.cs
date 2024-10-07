namespace PawFund.Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } // Adopter, Donor, Volunteer, Admin
        public DateTime DateRegistered { get; set; }
    }
}

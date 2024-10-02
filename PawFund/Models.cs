namespace PawFund.Backend;
public partial class PawFund
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public AdoptionStatus Status { get; set; }
        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; } // we don't want a plain password, do we?
        public UserRole Role { get; set; }

    }

    public class Shelter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactInfo { get; set; }
        public List<Pet> Pets { get; set; }
    }

    public class Donation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

    public class AdoptionApplication
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int PetId { get; set; }
        public Pet Pet { get; set; }
        public ApplicationStatus Status { get; set; }
        public DateTime ApplicationDate { get; set; }
    }

    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }
    }

    public enum AdoptionStatus
    {
        Available,
        Pending,
        Adopted
    }

    public enum UserRole
    {
        Guest,
        Adopter,
        Donor,
        Volunteer,
        ShelterStaff,
        Admin
    }

    public enum ApplicationStatus
    {
        Submitted,
        UnderReview,
        Approved,
        Rejected
    }
}
namespace PawFund.Backend
{
    public partial class PawFund
    {
        public interface IPetService
        {
            Task<IEnumerable<Pet>> GetAllPetsAsync();
            Task<Pet> GetPetByIdAsync(int id);
            Task<IEnumerable<Pet>> SearchPetsAsync(string searchTerm, string species, string breed, int? maxAge);
            Task<Pet> AddPetAsync(Pet pet);
            Task<Pet> UpdatePetAsync(Pet pet);
            Task DeletePetAsync(int id);
        }

        public interface IUserService
        {
            Task<User> GetUserByIdAsync(int id);
            Task<User> GetUserByUsernameAsync(string username);
            Task<User> RegisterUserAsync(User user, string password);
            Task<User> AuthenticateUserAsync(string username, string password);
            Task UpdateUserAsync(User user);
            Task DeleteUserAsync(int id);
        }

        public interface IShelterService
        {
            Task<IEnumerable<Shelter>> GetAllSheltersAsync();
            Task<Shelter> GetShelterByIdAsync(int id);
            Task<Shelter> AddShelterAsync(Shelter shelter);
            Task UpdateShelterAsync(Shelter shelter);
            Task DeleteShelterAsync(int id);
        }

        public interface IDonationService
        {
            Task<Donation> AddDonationAsync(Donation donation);
            Task<IEnumerable<Donation>> GetDonationByUserAsync(int userId);
            Task<IEnumerable<Donation>> GetDonationByShelterAsync(int shelterId);
        }

        public interface IAdoptionService
        {
            Task<AdoptionApplication> SubmitApplicationAsync(AdoptionApplication app);
            Task<AdoptionApplication> UpdateApplicationStatusAsync(int id, AdoptionApplication app);
            Task<IEnumerable<AdoptionApplication>> GetApplicationsByUserAsync(int userId);
            Task<IEnumerable<AdoptionApplication>> GetApplicationsByPetAsync(int petId);

        }
        
        public interface IEventService
        {
            Task<Event> AddEventAsync(Event eventItem);
            Task<IEnumerable<Event>> GetUpcomingEventsAsync();
            Task<IEnumerable<Event>> GetEventsByShelterId(int shelterId);
            Task UpdateEventAsync(Event eventItem);
            Task DeleteEventAsync(int id);
        }

        public interface INotificationService
        {
            Task SendNewPetNotificationAsync(Pet pet);
            Task SendAdoptionStatusUpdateAsync(AdoptionApplication application);
            Task SendEventReminderAsync(Event eventItem);
        }
    }
}

using PawFund.Data.Models;

namespace PawFund.Data.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int id);
        Task AddEventAsync(Event eventDto);
        Task UpdateEventAsync(Event eventDto);
        Task DeleteEventAsync(int id);
    }
}

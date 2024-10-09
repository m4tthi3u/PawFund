using PawFund.Core.Models;

namespace PawFund.Core.Interfaces.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int id);
        Task AddEventAsync(Event eventDto);
        Task UpdateEventAsync(Event eventDto);
        Task DeleteEventAsync(int id);
    }
}

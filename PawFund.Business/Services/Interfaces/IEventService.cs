using PawFund.Data.Models;

namespace PawFund.Business.Services.Interfaces
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

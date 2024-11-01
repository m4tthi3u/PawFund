using Microsoft.EntityFrameworkCore;
using PawFund.Data.Models;
using PawFund.Data.Context;
using PawFund.Data.Repositories.Interfaces;

namespace PawFund.Data.Repositories.Implementations
{
    public class EventRepository : IEventRepository
    {
        private readonly PawFundContext dbContext;
        public EventRepository(PawFundContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        public async Task AddEventAsync(Event @event)
        {
            await dbContext.Events.AddAsync(@event);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteEventAsync(int id)
        {
            var @event = await dbContext.Events.FindAsync(id);
            if (@event != null)
            {
                dbContext.Events.Remove(@event);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await dbContext.Events.ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            return await dbContext.Events.FindAsync(id);
        }

        public async Task UpdateEventAsync(Event @event)
        {
            dbContext.Entry(@event).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }


    }
}


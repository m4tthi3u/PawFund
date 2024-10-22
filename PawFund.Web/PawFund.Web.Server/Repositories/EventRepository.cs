using Microsoft.EntityFrameworkCore;
using PawFund.Web.Server.Data;
using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Models;

namespace PawFund.Web.Server.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext dbContext;
        public EventRepository(ApplicationDbContext dbContext) 
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


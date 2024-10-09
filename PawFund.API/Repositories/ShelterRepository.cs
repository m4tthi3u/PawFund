using Microsoft.EntityFrameworkCore;
using PawFund.API.Data;
using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Models;

namespace PawFund.API.Repositories
{
    public class ShelterRepository : IShelterRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ShelterRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddShelterAsync(Shelter shelter)
        {
            await dbContext.Shelters.AddAsync(shelter);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteShelterAsync(int id)
        {
            var shelter = await dbContext.Shelters.FindAsync(id);
            if (shelter != null)
            {
                dbContext.Shelters.Remove(shelter);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Shelter>> GetAllSheltersAsync()
        {
            return await dbContext.Shelters.ToListAsync();
        }

        public async Task<Shelter> GetShelterByIdAsync(int id)
        {
            return await dbContext.Shelters.FindAsync(id);
        }

        public async Task UpdateShelterAsync(Shelter shelter)
        {
            dbContext.Entry(shelter).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }


    }
}

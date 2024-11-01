using Microsoft.EntityFrameworkCore;
using PawFund.Data.Models;
using PawFund.Data.Context;
using PawFund.Data.Repositories.Interfaces;

namespace PawFund.Data.Repositories.Implementations
{
    public class PetRepository : IPetRepository
    {
        private readonly PawFundContext dbContext;

        public PetRepository(PawFundContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Pet>> GetAllPetsAsync()
        {
            return await dbContext.Pets.ToListAsync();
        }

        public async Task<Pet> GetPetByIdAsync(int id)
        {
            return await dbContext.Pets.FindAsync(id);
        }

        public async Task<IEnumerable<Pet>> SearchPetsAsync(string searchTerm)
        {
            return await dbContext.Pets.Where(p => p.Name.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task AddPetAsync(Pet pet)
        {
            await dbContext.Pets.AddAsync(pet);
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdatePetAsync(Pet pet)
        {
            dbContext.Entry(pet).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task DeletePetAsync(int id)
        {
            var pet = await dbContext.Pets.FindAsync(id);
            if (pet != null)
            {
                dbContext.Pets.Remove(pet);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}

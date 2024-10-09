using Microsoft.EntityFrameworkCore;
using PawFund.API.Data;
using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Models;

namespace PawFund.API.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PetRepository(ApplicationDbContext dbContext)
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

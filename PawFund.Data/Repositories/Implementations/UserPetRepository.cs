using Microsoft.EntityFrameworkCore;
using PawFund.Data.Context;
using PawFund.Data.Models;
using PawFund.Data.Repositories.Interfaces;

namespace PawFund.Data.Repositories.Implementations
{
    public class UserPetRepository : IUserPetRepository
    {
        private readonly PawFundContext _context;

        public UserPetRepository(PawFundContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserPet>> GetUserPetsAsync(int userId)
        {
            return await _context.UserPets
                .Include(up => up.Pet)
                .Where(up => up.UserId == userId)
                .ToListAsync();
        }

        public async Task<UserPet> GetUserPetByIdAsync(int id)
        {
            return await _context.UserPets
                .Include(up => up.Pet)
                .FirstOrDefaultAsync(up => up.Id == id);
        }

        public async Task<UserPet> GetUserPetByUserAndPetIdAsync(int userId, int petId)
        {
            return await _context.UserPets
                .Include(up => up.Pet)
                .FirstOrDefaultAsync(up => up.UserId == userId && up.PetId == petId);
        }

        public async Task AddUserPetAsync(UserPet userPet)
        {
            await _context.UserPets.AddAsync(userPet);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserPetAsync(UserPet userPet)
        {
            _context.Entry(userPet).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserPetAsync(int id)
        {
            var userPet = await _context.UserPets.FindAsync(id);
            if (userPet != null)
            {
                _context.UserPets.Remove(userPet);
                await _context.SaveChangesAsync();
            }
        }
    }
}
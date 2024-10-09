using Microsoft.EntityFrameworkCore;
using PawFund.API.Data;
using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Models;

namespace PawFund.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddUserAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user != null)
            {
                dbContext.Users.Remove(user);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await dbContext.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task UpdateUserAsync(User user)
        {
            dbContext.Entry(user).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task<User> SearchUserAsync(string searchTerm)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.Username.Contains(searchTerm));
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> LoginUserAsync(string username, string password)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }

    }
}

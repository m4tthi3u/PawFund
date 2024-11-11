using Microsoft.EntityFrameworkCore;
using PawFund.Data.Models;
using PawFund.Data.Context;
using PawFund.Data.Repositories.Interfaces;

namespace PawFund.Data.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly PawFundContext dbContext;

        public UserRepository(PawFundContext dbContext)
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
            return await dbContext.Users.SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task UpdateUserAsync(User user)
        {
            dbContext.Entry(user).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task<User> SearchUserAsync(string searchTerm)
        {
            return await dbContext.Users.SingleOrDefaultAsync(u => u.Username.Contains(searchTerm));
        }

        public async Task<User> LoginUserAsync(string username, string password)
        {
            var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Username == username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null; // User not found or password incorrect
            }
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await dbContext.Users.ToListAsync();
        }

    }
}

using PawFund.Core.Models;

namespace PawFund.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUsernameAsync(string username);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        // Register a user
        Task<User> RegisterUserAsync(User user);
        // Login a user
        Task<User> LoginUserAsync(string username, string password);
    }
}

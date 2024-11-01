using PawFund.Data.Models;

namespace PawFund.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUserAsync();
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

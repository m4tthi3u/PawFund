using PawFund.Data.Models;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Repositories.Interfaces;

namespace PawFund.Web.Server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task AddUserAsync(User user)
        {
            await userRepository.AddUserAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await userRepository.DeleteUserAsync(id);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await userRepository.GetUserByIdAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await userRepository.GetUserByUsernameAsync(username);
        }

        public async Task UpdateUserAsync(User user)
        {
            await userRepository.UpdateUserAsync(user);
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            return await userRepository.RegisterUserAsync(user);
        }

        public async Task<User> LoginUserAsync(string username, string password)
        {
            return await userRepository.LoginUserAsync(username, password);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await userRepository.GetAllUserAsync();
        }
    }
}

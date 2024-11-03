using PawFund.Data.Models;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Repositories.Interfaces;

namespace PawFund.Business.Services.Implementations
{
    public class UserPetService : IUserPetService
    {
        private readonly IUserPetRepository _userPetRepository;

        public UserPetService(IUserPetRepository userPetRepository)
        {
            _userPetRepository = userPetRepository;
        }

        public async Task<IEnumerable<UserPet>> GetUserPetsAsync(int userId)
        {
            return await _userPetRepository.GetUserPetsAsync(userId);
        }

        public async Task<UserPet> GetUserPetByIdAsync(int id)
        {
            return await _userPetRepository.GetUserPetByIdAsync(id);
        }

        public async Task<UserPet> GetUserPetByUserAndPetIdAsync(int userId, int petId)
        {
            return await _userPetRepository.GetUserPetByUserAndPetIdAsync(userId, petId);
        }

        public async Task AddUserPetAsync(UserPet userPet)
        {
            await _userPetRepository.AddUserPetAsync(userPet);
        }

        public async Task UpdateUserPetAsync(UserPet userPet)
        {
            await _userPetRepository.UpdateUserPetAsync(userPet);
        }

        public async Task DeleteUserPetAsync(int id)
        {
            await _userPetRepository.DeleteUserPetAsync(id);
        }
    }
}
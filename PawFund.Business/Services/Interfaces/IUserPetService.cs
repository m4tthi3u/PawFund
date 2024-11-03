using PawFund.Data.Models;

namespace PawFund.Business.Services.Interfaces
{
    public interface IUserPetService
    {
        Task<IEnumerable<UserPet>> GetUserPetsAsync(int userId);
        Task<UserPet> GetUserPetByIdAsync(int id);
        Task<UserPet> GetUserPetByUserAndPetIdAsync(int userId, int petId);
        Task AddUserPetAsync(UserPet userPet);
        Task UpdateUserPetAsync(UserPet userPet);
        Task DeleteUserPetAsync(int id);
    }
}
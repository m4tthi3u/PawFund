using PawFund.Data.Models;

namespace PawFund.Data.Repositories.Interfaces
{
    public interface IPetRepository
    {
        Task<IEnumerable<Pet>> GetAllPetsAsync();
        Task<Pet> GetPetByIdAsync(int id);
        Task<IEnumerable<Pet>> SearchPetsAsync(string searchTerm);
        Task AddPetAsync(Pet pet);
        Task UpdatePetAsync(Pet pet);
        Task DeletePetAsync(int id);
    }
}

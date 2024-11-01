using PawFund.Data.Models;

namespace PawFund.Business.Services.Interfaces
{
    public interface IPetService
    {
        Task<IEnumerable<Pet>> GetAllPetsAsync();
        Task<Pet> GetPetByIdAsync(int id);
        Task<IEnumerable<Pet>> SearchPetsAsync(string searchTerm);
        Task AddPetAsync(Pet pet);
        Task UpdatePetAsync(Pet pet);
        Task DeletePetAsync(int id);
    }
}

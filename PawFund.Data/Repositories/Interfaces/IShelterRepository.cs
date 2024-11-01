using PawFund.Data.Models;

namespace PawFund.Data.Repositories.Interfaces
{
    public interface IShelterRepository
    {
        Task<IEnumerable<Shelter>> GetAllSheltersAsync();
        Task<Shelter> GetShelterByIdAsync(int id);
        Task AddShelterAsync(Shelter shelter);
        Task UpdateShelterAsync(Shelter shelter);
        Task DeleteShelterAsync(int id);
    }
}

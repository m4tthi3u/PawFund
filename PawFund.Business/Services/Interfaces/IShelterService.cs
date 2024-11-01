using PawFund.Data.Models;

namespace PawFund.Business.Services.Interfaces
{
    public interface IShelterService
    {
        Task<IEnumerable<Shelter>> GetAllSheltersAsync();
        Task<Shelter> GetShelterByIdAsync(int id);
        Task AddShelterAsync(Shelter shelter);
        Task UpdateShelterAsync(Shelter shelter);
        Task DeleteShelterAsync(int id);
    }
}

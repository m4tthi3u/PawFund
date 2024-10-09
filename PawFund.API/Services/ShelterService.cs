using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.API.Services
{
    public class ShelterService : IShelterService
    {
        private readonly IShelterRepository shelterRepository;

        public ShelterService(IShelterRepository shelterRepository)
        {
            this.shelterRepository = shelterRepository;
        }

        public async Task AddShelterAsync(Shelter shelter)
        {
            await shelterRepository.AddShelterAsync(shelter);
        }

        public async Task DeleteShelterAsync(int id)
        {
            await shelterRepository.DeleteShelterAsync(id);
        }

        public async Task<IEnumerable<Shelter>> GetAllSheltersAsync()
        {
            return await shelterRepository.GetAllSheltersAsync();
        }

        public async Task<Shelter> GetShelterByIdAsync(int id)
        {
            return await shelterRepository.GetShelterByIdAsync(id);
        }

        public async Task UpdateShelterAsync(Shelter shelter)
        {
            await shelterRepository.UpdateShelterAsync(shelter);
        }
    }
}

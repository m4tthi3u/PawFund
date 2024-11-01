using PawFund.Data.Models;

namespace PawFund.Business.Services.Interfaces
{
    public interface IDonationService
    {
        Task<IEnumerable<Donation>> GetAllDonationsAsync();
        Task<Donation> GetDonationByIdAsync(int id);
        Task<IEnumerable<Donation>> GetDonationsByUserIdAsync(int userId);
        Task AddDonationAsync(Donation donation);
        Task UpdateDonationAsync(Donation donation);
        Task DeleteDonationAsync(int id);
        Task<decimal> GetTotalDonationsAsync();
    }
}

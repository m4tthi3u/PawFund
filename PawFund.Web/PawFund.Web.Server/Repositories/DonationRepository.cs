using Microsoft.EntityFrameworkCore;
using PawFund.Web.Server.Data;
using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Models;

namespace PawFund.Web.Server.Repositories
{
    public class DonationRepository : IDonationRepository
    {
        private readonly ApplicationDbContext dbContext;

        public DonationRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddDonationAsync(Donation donation)
        {
            await dbContext.Donations.AddAsync(donation);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteDonationAsync(int id)
        {
            var donation = await dbContext.Donations.FindAsync(id);
            if (donation != null)
            {
                dbContext.Donations.Remove(donation);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Donation>> GetAllDonationsAsync()
        {
            return await dbContext.Donations.ToListAsync();
        }

        public async Task<Donation> GetDonationByIdAsync(int id)
        {
            return await dbContext.Donations.FindAsync(id);
        }

        public async Task UpdateDonationAsync(Donation donation)
        {
            dbContext.Entry(donation).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Donation>> GetDonationsByUserIdAsync(int userId)
        {
            return await dbContext.Donations.Where(d => d.UserId == userId).ToListAsync();
        }

        public async Task<decimal> GetTotalDonationsAsync()
        {
            return await dbContext.Donations.SumAsync(d => d.Amount);
        }


    }
}

﻿using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.Web.Server.Services
{
    public class DonationService : IDonationService
    {
        private readonly IDonationRepository donationRepository;

        public DonationService(IDonationRepository donationRepository)
        {
            this.donationRepository = donationRepository;
        }

        public async Task AddDonationAsync(Donation donation)
        {
            await donationRepository.AddDonationAsync(donation);
        }

        public async Task DeleteDonationAsync(int id)
        {
            await donationRepository.DeleteDonationAsync(id);
        }

        public async Task<IEnumerable<Donation>> GetAllDonationsAsync()
        {
            return await donationRepository.GetAllDonationsAsync();
        }

        public async Task<Donation> GetDonationByIdAsync(int id)
        {
            return await donationRepository.GetDonationByIdAsync(id);
        }

        public async Task UpdateDonationAsync(Donation donation)
        {
            await donationRepository.UpdateDonationAsync(donation);
        }

        public async Task<IEnumerable<Donation>> GetDonationsByUserIdAsync(int userId)
        {
            return await donationRepository.GetDonationsByUserIdAsync(userId);
        }

        public async Task<decimal> GetTotalDonationsAsync()
        {
            return await donationRepository.GetTotalDonationsAsync();
        }

    }
}
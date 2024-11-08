using Microsoft.AspNetCore.SignalR;
using PawFund.Data.Models;

namespace PawFund.Presentation.Hubs
{
    public class PawFundHub : Hub
    {
        public async Task NotifyPetStatusUpdated(string petName, AdoptionStatus status)
        {
            await Clients.All.SendAsync("PetStatusUpdated", petName, status);
        }

        public async Task NotifyDonationAdded(string petName, decimal amount)
        {
            await Clients.All.SendAsync("DonationAdded", petName, amount);
        }
    }
}
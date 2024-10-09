using PawFund.API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Interfaces
{
    public interface IDonationService
    {
        IEnumerable<DonationDto> GetAllDonations();
        DonationDto GetDonationById(int id);
        void AddDonation(DonationDto donationDto);
        void DeleteDonation(int id);
        IEnumerable<DonationDto> GetUserDonations(int userId);
        decimal GetTotalDonations();
    }
}

using PawFund.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Interfaces
{
    public interface IDonationRepository
    {
        IEnumerable<Donation> FindAll();
        Donation FindById(int id);
        void Add(Donation donation);
        void Delete(int id);
        IEnumerable<Donation> FindByUserId(int userId);
        decimal GetTotalDonations();
    }

}

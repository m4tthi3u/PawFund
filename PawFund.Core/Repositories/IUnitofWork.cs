using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Repositories
{
    public interface IUnitOfWork
    {
        IPetRepository Pets { get; }
        IUserRepository Users { get; }
        IDonationRepository Donations { get; }
        IEventRepository Events { get; }

        void Commit();
    }
}

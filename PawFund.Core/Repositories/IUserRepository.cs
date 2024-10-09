using PawFund.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> FindAll();
        User FindById(int id);
        User FindByEmail(string email);
        void Add(User user);
        void Update(User user);
        void Delete(int id);
    }
}

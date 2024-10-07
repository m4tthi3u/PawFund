using PawFund.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Repositories
{
    public interface IEventRepository
    {
        IEnumerable<Event> FindAll();
        Event FindById(int id);
        void Add(Event eventEntity);
        void Update(Event eventEntity);
        void Delete(int id);
    }
}

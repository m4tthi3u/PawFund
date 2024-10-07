using PawFund.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Repositories
{
    public interface IPetRepository
    {
        IEnumerable<Pet> FindAll();
        //IEnumerable<Pet> FindAvailablePets(string breed, int age);
        Pet FindById(int id);
        void Add(Pet pet);
        void Update(Pet pet);
        void Delete(int id);
    }
}

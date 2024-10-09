using PawFund.Core.Interfaces;
using PawFund.Core.Models;
using PawFund.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using PawFund.Core.Repositories;

namespace PawFund.Infrastructure.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly ApplicationDbContext _context;

        public PetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Pet> FindAll()
        {
            return _context.Pets.ToList();
        }

        public Pet FindById(int id)
        {
            return _context.Pets.Find(id);
        }

        public void Add(Pet pet)
        {
            _context.Pets.Add(pet);
            _context.SaveChanges();
        }

        public void Update(Pet pet)
        {
            _context.Pets.Update(pet);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pet = _context.Pets.Find(id);
            if (pet != null)
            {
                _context.Pets.Remove(pet);
                _context.SaveChanges();
            }
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PawFund.Data;
using PawFund.Models;

namespace PawFund.Pages.Pets
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Pet> Pets { get; set; }

        public async Task OnGetAsync()
        {
            Pets = await _context.Pets.Include(p => p.Shelter).ToListAsync();
        }
    }
}
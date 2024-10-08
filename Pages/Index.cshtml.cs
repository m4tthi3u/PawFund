using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PawFund.Data;
using PawFund.Models;

namespace PawFund.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Pet> FeaturedPets { get; set; }
        public List<Event> UpcomingEvents { get; set; }

        public async Task OnGetAsync()
        {
            FeaturedPets = await _context.Pets
                .Where(p => !p.IsAdopted)
                .OrderBy(p => Guid.NewGuid())
                .Take(3)
                .ToListAsync();

            UpcomingEvents = await _context.Events
                .Where(e => e.Date > DateTime.Now)
                .OrderBy(e => e.Date)
                .Take(3)
                .ToListAsync();
        }
    }
}

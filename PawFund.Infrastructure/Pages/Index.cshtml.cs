using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IPetService petService;
        private readonly IEventService eventService;

        public IndexModel(IPetService petService, IEventService eventService)
        {
            this.petService = petService;
            this.eventService = eventService;
        }

        public IEnumerable<Pet> AvailablePets { get; set; }
        public IEnumerable<Event> UpcomingEvents { get; set; }

        public async Task OnGetAsync()
        {
            AvailablePets = await petService.GetAllPetsAsync();
            UpcomingEvents = await eventService.GetAllEventsAsync();
        }
    }
}

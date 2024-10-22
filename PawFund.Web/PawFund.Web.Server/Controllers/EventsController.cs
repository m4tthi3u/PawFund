using Microsoft.AspNetCore.Mvc;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.Web.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService eventService;

        public EventsController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await eventService.GetAllEventsAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var eventDto = await eventService.GetEventByIdAsync(id);
            if (eventDto == null)
            {
                return NotFound();
            }
            return Ok(eventDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddEvent(Event eventDto)
        {
            await eventService.AddEventAsync(eventDto);
            return CreatedAtAction(nameof(GetEvent), new { id = eventDto.Id }, eventDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, Event eventDto)
        {
            if (id != eventDto.Id)
            {
                return BadRequest();
            }
            await eventService.UpdateEventAsync(eventDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            await eventService.DeleteEventAsync(id);
            return NoContent();
        }

    }
}

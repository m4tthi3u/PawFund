using Microsoft.AspNetCore.Mvc;
using PawFund.Business.DTOs;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;

namespace PawFund.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventResponseDto>>> GetEvents()
        {
            var events = await _eventService.GetAllEventsAsync();
            var eventDtos = events.Select(MapToResponseDto);
            return Ok(eventDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventResponseDto>> GetEvent(int id)
        {
            var @event = await _eventService.GetEventByIdAsync(id);
            if (@event == null)
            {
                return NotFound();
            }
            return Ok(MapToResponseDto(@event));
        }

        [HttpPost]
        public async Task<ActionResult<EventResponseDto>> CreateEvent(EventCreateDto createDto)
        {
            var @event = MapToEntity(createDto);
            await _eventService.AddEventAsync(@event);
            
            var responseDto = MapToResponseDto(@event);
            return CreatedAtAction(nameof(GetEvent), new { id = @event.Id }, responseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, EventCreateDto updateDto)
        {
            var existingEvent = await _eventService.GetEventByIdAsync(id);
            if (existingEvent == null)
            {
                return NotFound();
            }

            UpdateEntityFromDto(existingEvent, updateDto);
            await _eventService.UpdateEventAsync(existingEvent);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _eventService.GetEventByIdAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            await _eventService.DeleteEventAsync(id);
            return NoContent();
        }

        private EventResponseDto MapToResponseDto(Event @event)
        {
            return new EventResponseDto
            {
                Id = @event.Id,
                Title = @event.Title,
                Description = @event.Description,
                Date = @event.Date,
                Location = @event.Location,
                ShelterId = @event.ShelterId
            };
        }

        private Event MapToEntity(EventCreateDto dto)
        {
            return new Event
            {
                Title = dto.Title,
                Description = dto.Description,
                Date = dto.Date,
                Location = dto.Location,
                ShelterId = dto.ShelterId
            };
        }

        private void UpdateEntityFromDto(Event @event, EventCreateDto dto)
        {
            @event.Title = dto.Title;
            @event.Description = dto.Description;
            @event.Date = dto.Date;
            @event.Location = dto.Location;
            @event.ShelterId = dto.ShelterId;
        }
    }
}
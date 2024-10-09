﻿using PawFund.Core.Interfaces.Repositories;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.API.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        public async Task AddEventAsync(Event eventDto)
        {
            await eventRepository.AddEventAsync(eventDto);
        }

        public async Task DeleteEventAsync(int id)
        {
            await eventRepository.DeleteEventAsync(id);
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await eventRepository.GetAllEventsAsync();
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            return await eventRepository.GetEventByIdAsync(id);
        }

        public async Task UpdateEventAsync(Event eventDto)
        {
            await eventRepository.UpdateEventAsync(eventDto);
        }
    }
}

using PawFund.API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PawFund.Core.Interfaces
{
    public interface IEventService
    {
        IEnumerable<EventDto> GetAllEvents();
        EventDto GetEventById(int id);
        void AddEvent(EventDto eventDto);
        void UpdateEvent(int id, EventDto eventDto);
        void DeleteEvent(int id);
    }
}

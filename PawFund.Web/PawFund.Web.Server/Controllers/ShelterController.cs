using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.Web.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ShelterController : ControllerBase
    {
        private readonly IShelterService shelterService;

        public ShelterController(IShelterService shelterService)
        {
            this.shelterService = shelterService;
        }

        [HttpGet]
        public async Task<IActionResult> GetShelters()
        {
            var shelters = await shelterService.GetAllSheltersAsync();
            return Ok(shelters);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shelter>> GetShelter(int id)
        {
            var shelter = await shelterService.GetShelterByIdAsync(id);
            if (shelter == null)
            {
                return NotFound();
            }
            return Ok(shelter);
        }

        [HttpPost]
        public async Task<IActionResult> AddShelter(Shelter shelter)
        {
            await shelterService.AddShelterAsync(shelter);
            return CreatedAtAction(nameof(GetShelter), new { id = shelter.Id }, shelter);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShelter(int id, Shelter shelter)
        {
            if (id != shelter.Id)
            {
                return BadRequest();
            }
            await shelterService.UpdateShelterAsync(shelter);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShelter(int id)
        {
            await shelterService.DeleteShelterAsync(id);
            return NoContent();
        }

    }
}

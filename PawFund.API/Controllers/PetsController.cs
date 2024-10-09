using Microsoft.AspNetCore.Mvc;
using PawFund.API.Services;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PetsController : ControllerBase
    {
       private readonly IPetService petService;

        public PetsController(IPetService petService)
        {
            this.petService = petService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPets()
        {
            var pets = await petService.GetAllPetsAsync();
            return Ok(pets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pet>> GetPet(int id)
        {
            var pet = await petService.GetPetByIdAsync(id);
            if (pet == null)
            {
                return NotFound();
            }
            return Ok(pet);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchPets([FromQuery] string searchTerm)
        {
            var pets = await petService.SearchPetsAsync(searchTerm);
            return Ok(pets);
        }

        [HttpPost]
        public async Task<IActionResult> AddPet(Pet pet)
        {
            await petService.AddPetAsync(pet);
            return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePet(int id, Pet pet)
        {
            if (id != pet.Id)
            {
                return BadRequest();
            }
            await petService.UpdatePetAsync(pet);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            await petService.DeletePetAsync(id);
            return NoContent();
        }
    }
}

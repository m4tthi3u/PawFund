using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PawFund.Business.DTOs;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;

namespace PawFund.Presentation.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PetsController : ControllerBase
    {
        private readonly IPetService _petService;

        public PetsController(IPetService petService)
        {
            _petService = petService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetResponseDto>>> GetPets()
        {
            var pets = await _petService.GetAllPetsAsync();
            var petDtos = pets.Select(MapToResponseDto);
            return Ok(petDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PetResponseDto>> GetPet(int id)
        {
            var pet = await _petService.GetPetByIdAsync(id);
            if (pet == null)
            {
                return NotFound();
            }
            return Ok(MapToResponseDto(pet));
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<PetResponseDto>>> SearchPets([FromQuery] string searchTerm)
        {
            var pets = await _petService.SearchPetsAsync(searchTerm);
            var petDtos = pets.Select(MapToResponseDto);
            return Ok(petDtos);
        }
        
        [Authorize(Roles = "Admin, Staff")]
        [HttpPost]
        public async Task<ActionResult<PetResponseDto>> AddPet(PetCreateDto createDto)
        {
            var pet = MapToEntity(createDto);
            await _petService.AddPetAsync(pet);
            var responseDto = MapToResponseDto(pet);
            return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, responseDto);
        }
        
        [Authorize(Roles = "Admin, Staff")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePet(int id, PetUpdateDto updateDto)
        {
            var existingPet = await _petService.GetPetByIdAsync(id);
            if (existingPet == null)
            {
                return NotFound();
            }
            
            UpdateEntityFromDto(existingPet, updateDto);
            await _petService.UpdatePetAsync(existingPet);
            return NoContent();
        }
        
        [Authorize(Roles = "Admin, Staff")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await _petService.GetPetByIdAsync(id);
            if (pet == null)
            {
                return NotFound();
            }

            await _petService.DeletePetAsync(id);
            return NoContent();
        }
        
        private PetResponseDto MapToResponseDto(Pet pet)
        {
            return new PetResponseDto
            {
                Id = pet.Id,
                Name = pet.Name,
                Species = pet.Species,
                Breed = pet.Breed,
                Age = pet.Age,
                Gender = pet.Gender,
                Description = pet.Description,
                ImageUrl = pet.ImageUrl,
                Status = pet.Status,
                ShelterId = pet.ShelterId
            };
        }

        private Pet MapToEntity(PetCreateDto dto)
        {
            return new Pet
            {
                Name = dto.Name,
                Species = dto.Species,
                Breed = dto.Breed,
                Age = dto.Age,
                Gender = dto.Gender,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                Status = AdoptionStatus.Available, // Set default status for new pets
                ShelterId = dto.ShelterId
            };
        }

        private void UpdateEntityFromDto(Pet pet, PetUpdateDto dto)
        {
            pet.Name = dto.Name;
            pet.Species = dto.Species;
            pet.Breed = dto.Breed;
            pet.Age = dto.Age;
            pet.Gender = dto.Gender;
            pet.Description = dto.Description;
            pet.ImageUrl = dto.ImageUrl;
            pet.Status = dto.Status;
            pet.ShelterId = dto.ShelterId;
        }
    }
}
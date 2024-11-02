using Microsoft.AspNetCore.Mvc;
using PawFund.Business.DTOs;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;

namespace PawFund.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ShelterController : ControllerBase
    {
        private readonly IShelterService _shelterService;

        public ShelterController(IShelterService shelterService)
        {
            _shelterService = shelterService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShelterResponseDto>>> GetShelters()
        {
            var shelters = await _shelterService.GetAllSheltersAsync();
            var shelterDtos = shelters.Select(MapToResponseDto);
            return Ok(shelterDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShelterResponseDto>> GetShelter(int id)
        {
            var shelter = await _shelterService.GetShelterByIdAsync(id);
            if (shelter == null)
            {
                return NotFound();
            }
            return Ok(MapToResponseDto(shelter));
        }

        [HttpPost]
        public async Task<ActionResult<ShelterResponseDto>> CreateShelter(ShelterCreateDto createDto)
        {
            var shelter = MapToEntity(createDto);
            await _shelterService.AddShelterAsync(shelter);
            
            var responseDto = MapToResponseDto(shelter);
            return CreatedAtAction(nameof(GetShelter), new { id = shelter.Id }, responseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShelter(int id, ShelterCreateDto updateDto)
        {
            var existingShelter = await _shelterService.GetShelterByIdAsync(id);
            if (existingShelter == null)
            {
                return NotFound();
            }

            UpdateEntityFromDto(existingShelter, updateDto);
            await _shelterService.UpdateShelterAsync(existingShelter);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShelter(int id)
        {
            var shelter = await _shelterService.GetShelterByIdAsync(id);
            if (shelter == null)
            {
                return NotFound();
            }

            await _shelterService.DeleteShelterAsync(id);
            return NoContent();
        }

        private ShelterResponseDto MapToResponseDto(Shelter shelter)
        {
            return new ShelterResponseDto
            {
                Id = shelter.Id,
                Name = shelter.Name,
                Address = shelter.Address,
                PhoneNumber = shelter.PhoneNumber,
                Email = shelter.Email
            };
        }

        private Shelter MapToEntity(ShelterCreateDto dto)
        {
            return new Shelter
            {
                Name = dto.Name,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email
            };
        }

        private void UpdateEntityFromDto(Shelter shelter, ShelterCreateDto dto)
        {
            shelter.Name = dto.Name;
            shelter.Address = dto.Address;
            shelter.PhoneNumber = dto.PhoneNumber;
            shelter.Email = dto.Email;
        }
    }
}
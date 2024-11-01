using Microsoft.AspNetCore.Mvc;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;
using PawFund.Presentation.DTOs;

namespace PawFund.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DonationController : ControllerBase
    {
        private readonly IDonationService _donationService;

        public DonationController(IDonationService donationService)
        {
            _donationService = donationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationResponseDto>>> GetDonations()
        {
            var donations = await _donationService.GetAllDonationsAsync();
            var donationDtos = donations.Select(MapToResponseDto);
            return Ok(donationDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DonationResponseDto>> GetDonationById(int id)
        {
            var donation = await _donationService.GetDonationByIdAsync(id);
            if (donation == null)
            {
                return NotFound();
            }
            return Ok(MapToResponseDto(donation));
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<DonationResponseDto>>> GetDonationByUserId(int userId)
        {
            var donations = await _donationService.GetDonationsByUserIdAsync(userId);
            var donationDtos = donations.Select(MapToResponseDto);
            return Ok(donationDtos);
        }

        [HttpPost]
        public async Task<ActionResult<DonationResponseDto>> AddDonation(DonationCreateDto createDto)
        {
            var donation = MapToEntity(createDto);
            donation.DonationDate = DateTime.UtcNow;
            donation.Status = DonationStatus.Pending;

            await _donationService.AddDonationAsync(donation);
            
            var responseDto = MapToResponseDto(donation);
            return CreatedAtAction(nameof(GetDonationById), new { id = donation.Id }, responseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDonation(int id, DonationUpdateDto updateDto)
        {
            if (id != updateDto.Id)
            {
                return BadRequest();
            }

            var existingDonation = await _donationService.GetDonationByIdAsync(id);
            if (existingDonation == null)
            {
                return NotFound();
            }

            UpdateEntityFromDto(existingDonation, updateDto);
            await _donationService.UpdateDonationAsync(existingDonation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonation(int id)
        {
            var donation = await _donationService.GetDonationByIdAsync(id);
            if (donation == null)
            {
                return NotFound();
            }

            await _donationService.DeleteDonationAsync(id);
            return NoContent();
        }

        // Helper methods for mapping
        private DonationResponseDto MapToResponseDto(Donation donation)
        {
            return new DonationResponseDto
            {
                Id = donation.Id,
                UserId = donation.UserId,
                ShelterId = donation.ShelterId,
                PetId = donation.PetId,
                Amount = donation.Amount,
                DonationDate = donation.DonationDate,
                Status = donation.Status,
                PaymentMethod = donation.PaymentMethod
            };
        }

        private Donation MapToEntity(DonationCreateDto dto)
        {
            return new Donation
            {
                UserId = dto.UserId,
                ShelterId = dto.ShelterId,
                PetId = dto.PetId,
                Amount = dto.Amount,
                PaymentMethod = dto.PaymentMethod,
                DonationDate = DateTime.UtcNow,
                Status = DonationStatus.Pending
            };
        }

        private void UpdateEntityFromDto(Donation donation, DonationUpdateDto dto)
        {
            donation.Amount = dto.Amount;
            donation.Status = dto.Status;
            donation.PaymentMethod = dto.PaymentMethod;
        }
    }
}
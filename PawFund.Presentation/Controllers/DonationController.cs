using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PawFund.Business.DTOs;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;
using PawFund.Presentation.Hubs;

namespace PawFund.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DonationController : ControllerBase
    {
        private readonly IDonationService _donationService;
        private readonly IHubContext<PawFundHub> _hubContext;

        public DonationController(IDonationService donationService, IHubContext<PawFundHub> hubContext)
        {
            _donationService = donationService;
            _hubContext = hubContext;
        }
        
        [Authorize(Roles = "Admin, Staff")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationResponseDto>>> GetDonations()
        {
            var donations = await _donationService.GetAllDonationsAsync();
            var donationDtos = donations.Select(MapToResponseDto);
            return Ok(donationDtos);
        }
        
        [Authorize(Roles = "Admin, Staff")]
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
        
        [Authorize(Roles = "Admin, Staff")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<DonationResponseDto>>> GetDonationByUserId(int userId)
        {
            var donations = await _donationService.GetDonationsByUserIdAsync(userId);
            var donationDtos = donations.Select(MapToResponseDto);
            return Ok(donationDtos);
        }
        
        [Authorize(Roles = "Admin, Staff")]
        [HttpPost]
        public async Task<ActionResult<DonationResponseDto>> AddDonation(DonationCreateDto createDto)
        {
            var donation = MapToEntity(createDto);
            donation.DonationDate = DateTime.UtcNow;
            donation.Status = DonationStatus.Pending;

            await _donationService.AddDonationAsync(donation);
            await _hubContext.Clients.All.SendAsync("DonationAdded", donation.PetName, donation.Amount);
            
            var responseDto = MapToResponseDto(donation);
            return CreatedAtAction(nameof(GetDonationById), new { id = donation.Id }, responseDto);
        }
        
        [Authorize(Roles = "Admin, Staff")]
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
        
        [Authorize(Roles = "Admin, Staff")]
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
                PetName = donation.PetName,
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
                PetName = dto.PetName,
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
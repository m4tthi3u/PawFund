using Microsoft.AspNetCore.Mvc;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DonationController : ControllerBase
    {
        private readonly IDonationService donationService;

        public DonationController(IDonationService donationService)
        {
            this.donationService = donationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDonations()
        {
            var donations = await donationService.GetAllDonationsAsync();
            return Ok(donations);
        }

        [HttpGet]
        public async Task<IActionResult> GetDonationById(int id)
        {
            var donation = await donationService.GetDonationByIdAsync(id);
            if (donation == null)
            {
                return NotFound();
            }
            return Ok(donation);
        }

        [HttpGet]
        public async Task<IActionResult> GetDonationByUserId(int userId)
        {
            var donations = await donationService.GetDonationsByUserIdAsync(userId);
            return Ok(donations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Donation>> GetDonation(int id)
        {
            var donation = await donationService.GetDonationByIdAsync(id);
            if (donation == null)
            {
                return NotFound();
            }
            return Ok(donation);
        }

        [HttpPost]
        public async Task<IActionResult> AddDonation(Donation donation)
        {
            await donationService.AddDonationAsync(donation);
            return CreatedAtAction(nameof(GetDonation), new { id = donation.Id }, donation);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDonation(int id, Donation donation)
        {
            if (id != donation.Id)
            {
                return BadRequest();
            }
            await donationService.UpdateDonationAsync(donation);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDonation(int id)
        {
            await donationService.DeleteDonationAsync(id);
            return NoContent();
        }

        

    }
}

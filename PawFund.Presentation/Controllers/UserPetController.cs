using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;
using System.Security.Claims;

namespace PawFund.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserPetController : ControllerBase
    {
        private readonly IUserPetService _userPetService;
        private readonly IPetService _petService;

        public UserPetController(IUserPetService userPetService, IPetService petService)
        {
            _userPetService = userPetService;
            _petService = petService;
        }

        [Authorize]
        [HttpGet("mypets")]
        public async Task<ActionResult<IEnumerable<UserPet>>> GetUserPets()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest("Invalid user ID");
            }

            var userPets = await _userPetService.GetUserPetsAsync(userId);
            return Ok(userPets);
        }

        [Authorize]
        [HttpPost("adopt/{petId}")]
        public async Task<IActionResult> AdoptPet(int petId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest("Invalid user ID");
            }

            // Check if pet exists and is available
            var pet = await _petService.GetPetByIdAsync(petId);
            if (pet == null)
            {
                return NotFound("Pet not found");
            }

            if (pet.Status != AdoptionStatus.Available)
            {
                return BadRequest("This pet is not available for adoption");
            }

            // Check if user already has a pending or approved adoption for this pet
            var existingUserPet = await _userPetService.GetUserPetByUserAndPetIdAsync(userId, petId);
            if (existingUserPet != null)
            {
                return BadRequest("You already have a pending or approved adoption for this pet");
            }

            var userPet = new UserPet
            {
                UserId = userId,
                PetId = petId,
                AdoptionDate = DateTime.UtcNow,
                Status = AdoptionStatus.Pending
            };

            // Update pet status to pending
            pet.Status = AdoptionStatus.Pending;
            await _petService.UpdatePetAsync(pet);

            // Create the user-pet relationship
            await _userPetService.AddUserPetAsync(userPet);

            return Ok("Adoption request submitted successfully");
        }

        [Authorize(Roles = "Admin,Staff")]
        [HttpPut("updatestatus/{userPetId}")]
        public async Task<IActionResult> UpdateAdoptionStatus(int userPetId, [FromBody] AdoptionStatus newStatus)
        {
            var userPet = await _userPetService.GetUserPetByIdAsync(userPetId);
            if (userPet == null)
            {
                return NotFound("Adoption record not found");
            }

            // Update the adoption status
            userPet.Status = newStatus;
            await _userPetService.UpdateUserPetAsync(userPet);

            // Update the pet's status accordingly
            var pet = await _petService.GetPetByIdAsync(userPet.PetId);
            if (pet != null)
            {
                pet.Status = newStatus;
                await _petService.UpdatePetAsync(pet);
            }

            return Ok("Adoption status updated successfully");
        }

        [Authorize]
        [HttpDelete("cancel/{userPetId}")]
        public async Task<IActionResult> CancelAdoption(int userPetId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest("Invalid user ID");
            }

            var userPet = await _userPetService.GetUserPetByIdAsync(userPetId);
            if (userPet == null)
            {
                return NotFound("Adoption record not found");
            }

            if (userPet.UserId != userId)
            {
                return Unauthorized("You can only cancel your own adoption requests");
            }

            if (userPet.Status == AdoptionStatus.Aprroved)
            {
                return BadRequest("Cannot cancel an approved adoption");
            }

            // Update the pet's status back to available
            var pet = await _petService.GetPetByIdAsync(userPet.PetId);
            if (pet != null)
            {
                pet.Status = AdoptionStatus.Available;
                await _petService.UpdatePetAsync(pet);
            }

            await _userPetService.DeleteUserPetAsync(userPetId);
            return Ok("Adoption request cancelled successfully");
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using PawFund.Business.Services.Interfaces;
using PawFund.Data.Models;
using PawFund.Presentation.DTOs;

namespace PawFund.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            var userDtos = users.Select(MapToResponseDto);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(MapToResponseDto(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserResponseDto>> CreateUser(UserCreateDto createDto)
        {
            var user = MapToEntity(createDto);
            user.Role = UserRole.Guest;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(createDto.Password); // Hash the password
            await _userService.AddUserAsync(user);
    
            var responseDto = MapToResponseDto(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, responseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDto updateDto)
        {
            var existingUser = await _userService.GetUserByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            UpdateEntityFromDto(existingUser, updateDto);
            await _userService.UpdateUserAsync(existingUser);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userService.DeleteUserAsync(id);
            return NoContent();
        }

        private UserResponseDto MapToResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role
            };
        }

        private User MapToEntity(UserCreateDto dto)
        {
            return new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Role = UserRole.Guest
            };
        }

        private void UpdateEntityFromDto(User user, UserUpdateDto dto)
        {
            user.Username = dto.Username;
            user.Email = dto.Email;
            user.Role = dto.Role;
        }
    }
}
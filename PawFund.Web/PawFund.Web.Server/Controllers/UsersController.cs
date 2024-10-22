using Microsoft.AspNetCore.Mvc;
using PawFund.Core.Interfaces.Services;
using PawFund.Core.Models;

namespace PawFund.Web.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string searchTerm)
        {
            var users = await userService.GetUserByUsernameAsync(searchTerm);
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            await userService.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            await userService.UpdateUserAsync(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await userService.DeleteUserAsync(id);
            return NoContent();
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromQuery] string password)
        {
            var user = await userService.LoginUserAsync(username, password);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("register")]

        public async Task<IActionResult> Register(User regUser)
        {
            var user = await userService.RegisterUserAsync(regUser);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


    }
}

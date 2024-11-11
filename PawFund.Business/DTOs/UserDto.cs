using System.ComponentModel.DataAnnotations;
using PawFund.Data.Models;

namespace PawFund.Business.DTOs
{

    public class UserCreateDto
    {
        [Required]
        [StringLength(30)]
        public string Username { get; set; }
        [Required]
        [StringLength(30)]
        public string Email { get; set; }
        [Required]
        [StringLength(32)]
        public string Password { get; set; }
    }

    public class UserUpdateDto
    {
        [Required]
        [StringLength(30)]
        public string Username { get; set; }
        [Required]
        [StringLength(30)]
        public string Email { get; set; }
        public UserRole Role { get; set; }
    }

    public class UserResponseDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
    }
}
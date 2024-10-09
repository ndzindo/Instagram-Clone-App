using System.ComponentModel.DataAnnotations;
namespace AngularApp1.Server.Models{

public class RegisterRequest
{
    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(10, MinimumLength = 5)]
    public string Password { get; set; }
}

}
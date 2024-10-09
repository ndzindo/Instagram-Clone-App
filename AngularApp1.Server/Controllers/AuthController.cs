using Microsoft.AspNetCore.Mvc;
using AngularApp1.Server.Models;
using AngularApp1.Server.Services;
using Microsoft.AspNetCore.Cors;

[ApiController]
[EnableCors("AllowAngularApp")]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly AppDbContext _context;

    public AuthController(AuthService authService, AppDbContext context)
    {
        _authService = authService;
        _context = context;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);
        if (result)
            return Ok();
        return BadRequest("Registration failed");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var token = await _authService.LoginAsync(request);
        if (token != null)
            return Ok(new { Token = token });
        return Unauthorized("Invalid credentials");
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        _authService.Logout();
        return Ok();
    }
     [HttpGet("username/{id}")]
    public async Task<IActionResult> GetUsernameById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        return Ok(new { username = user.Username });
    }
}

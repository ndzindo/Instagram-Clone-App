using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;    


[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("username/{id}")]
    public async Task<IActionResult> GetUsernameById(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok(user.Username);
    }
    [HttpGet("search")]
public async Task<IActionResult> SearchUsers([FromQuery] string username)
{
    var users = await _context.Users
        .Where(u => u.Username.Contains(username))
        .Select(u => new
        {
            u.Id,
            u.Username,
            u.ProfilePictureUrl
        })
        .ToListAsync();
    return Ok(users);
}

[HttpGet("{id}")]
public async Task<IActionResult> GetUserProfile(int id)
{
    var user = await _context.Users.FindAsync(id);
    if (user == null)
    {
        return NotFound();
    }

    var posts = await _context.Posts
        .Where(p => p.UserId == id)
        .OrderByDescending(p => p.CreationDate)
        .Take(3)
        .Select(p => new
        {
            p.Id,
            p.Description,
            p.PostPictureUrl,
            p.CreationDate,
            p.NumberOfLikes,
            p.NumberOfComments
        })
        .ToListAsync();

    return Ok(new
    {
        user = new
        {
            user.Id,
            user.Username,
            user.ProfilePictureUrl
        },
        posts
    });
}
[HttpGet("info/{id}")]
    public async Task<IActionResult> GetUserInfo(int id)
    {
        var user = await _context.Users
            .Where(u => u.Id == id)
            .Select(u => new
            {
                u.Id,
                u.Username,
                u.Email,
                u.PasswordHash,
                u.ProfilePictureUrl,
                u.IsDarkTheme,
                u.NotificationsEnabled
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok(user);
    }

}

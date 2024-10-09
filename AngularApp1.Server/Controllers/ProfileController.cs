using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProfileController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfile(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfile(int id, [FromBody] ProfileUpdateDto profileUpdate)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        user.ProfilePictureUrl = profileUpdate.ProfilePictureUrl;
        user.IsDarkTheme = profileUpdate.IsDarkTheme;
        user.NotificationsEnabled = profileUpdate.NotificationsEnabled;

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Profile updated successfully." });
    }
     [HttpGet("{userId}/last-three-posts")]
    public async Task<IActionResult> GetLastThreePosts(int userId)
    {
        var posts = await _context.Posts
            .Where(p => p.UserId == userId)
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

        if (posts == null || !posts.Any())
        {
            return NotFound("No posts found for this user.");
        }

        return Ok(posts);
    }
}

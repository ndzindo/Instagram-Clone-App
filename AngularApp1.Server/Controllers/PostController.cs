using Microsoft.AspNetCore.Mvc;
using AngularApp1.Server.Models;
using AngularApp1.Server.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
public async Task<IActionResult> GetPosts(int page = 1, int pageSize = 10)
{
    var totalPosts = await _context.Posts.CountAsync();
    
    var posts = await _context.Posts
        .Include(p => p.Comments)
        .ThenInclude(c => c.User) 
        .Include(p => p.User) 
        .OrderByDescending(p => p.CreationDate)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Ok(new { posts, totalPosts });
}


    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] PostCreateDto postDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var post = new Post
        {
            Description = postDto.Description,
            PostPictureUrl = postDto.PostPictureUrl,
            UserId = postDto.UserId,
            CreationDate = DateTime.UtcNow 
        };

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(int id)
    {
        var post = await _context.Posts.FindAsync(id);

        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class LikeController : ControllerBase
{
    private readonly AppDbContext _context;

    public LikeController(AppDbContext context)
    {
        _context = context;
    }

   [HttpPost]
public async Task<IActionResult> LikePost([FromBody] LikeDto likeDto)
{
    if (likeDto == null)
    {
        return BadRequest("Like data is null");
    }


    var existingLike = await _context.Likes
        .FirstOrDefaultAsync(l => l.PostId == likeDto.PostId && l.UserId == likeDto.UserId);

    if (existingLike != null)
    {
        return BadRequest("User has already liked this post");
    }


    var like = new Like
    {
        PostId = likeDto.PostId,
        UserId = likeDto.UserId
    };

    _context.Likes.Add(like);


    var post = await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == likeDto.PostId);
    if (post == null)
    {
        return NotFound("Post not found");
    }

    post.NumberOfLikes += 1;
    _context.Posts.Update(post);


    var user = await _context.Users.FindAsync(likeDto.UserId);
    if (user == null)
    {
        return NotFound("User not found");
    }


    
        var notification = new Notification
        {
            UserId = post.UserId,
            Message = $"{user.Username} liked your post.", 
            CreatedAt = DateTime.UtcNow.AddHours(2), 
            IsRead = false
        };

        _context.Notifications.Add(notification);
    

    await _context.SaveChangesAsync();

    return Ok(new { message = "Post liked successfully", postId = likeDto.PostId, numberOfLikes = post.NumberOfLikes });
}


}

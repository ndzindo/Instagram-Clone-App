using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;


namespace AngularApp1.Server.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private readonly AppDbContext _context;

    public CommentController(AppDbContext context)
    {
        _context = context;
    }

   [HttpPost]
public async Task<IActionResult> AddComment([FromBody] CommentCreateDto commentDto)
{
    if (commentDto == null)
    {
        return BadRequest("Comment data is null");
    }

    var user = await _context.Users.FindAsync(commentDto.UserId);
    if (user == null)
    {
        return NotFound("User not found");
    }

    var post = await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == commentDto.PostId);
    if (post == null)
    {
        return NotFound("Post not found");
    }

    var comment = new Comment
    {
        PostId = commentDto.PostId,
        UserId = commentDto.UserId,
        Content = commentDto.Content
    };

    _context.Comments.Add(comment);
    post.NumberOfComments += 1;
    _context.Posts.Update(post);

    
        var notification = new Notification
        {
            UserId = post.UserId,
            Message = $"{user.Username} commented on your post.",
            CreatedAt = DateTime.UtcNow.AddHours(2),
            IsRead = false
        };

        _context.Notifications.Add(notification);
    

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Comment added successfully",
        postId = commentDto.PostId,
        numberOfComments = post.NumberOfComments,
        comment = new
        {
            user.Username,
            comment.Content
        }
    });
}


        // GET api/comment/{postId}
        [HttpGet("{postId}")]
        public async Task<IActionResult> GetComments(int postId)
        {
            
            var comments = await _context.Comments
                .Include(c => c.User) 
                .Where(c => c.PostId == postId)
                .ToListAsync();

            if (comments == null || comments.Count == 0)
            {
                return NotFound("No comments found for this post");
            }

            return Ok(comments);
        }

        // DELETE api/comment/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            
            _context.Comments.Remove(comment);

         
            var post = await _context.Posts.FindAsync(comment.PostId);
            if (post != null)
            {
                post.NumberOfComments -= 1;
                _context.Posts.Update(post);
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Comment deleted successfully" });
        }
    }
}

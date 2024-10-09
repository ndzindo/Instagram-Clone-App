namespace AngularApp1.Server.Models{
public class Post
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int NumberOfLikes { get; set; }
    public int NumberOfComments { get; set; }
    public string PostPictureUrl { get; set; }
    public DateTime CreationDate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public List<Comment> Comments { get; set; } = new List<Comment>();
}


}
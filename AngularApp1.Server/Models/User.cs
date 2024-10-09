namespace AngularApp1.Server.Models{

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string ProfilePictureUrl { get; set; }="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg";
    public bool IsDarkTheme { get; set; }
    public bool NotificationsEnabled { get; set; }
    public List<Post> Posts { get; set; } = new List<Post>();
    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<Like> Likes { get; set; } = new List<Like>();
}

}
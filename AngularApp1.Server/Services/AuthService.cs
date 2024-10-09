using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Text;
using AngularApp1.Server.Models; 

namespace AngularApp1.Server.Services{
public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthService(IConfiguration configuration, AppDbContext context, IPasswordHasher<User> passwordHasher)
    {
        _configuration = configuration;
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<bool> RegisterAsync(RegisterRequest request)
{
   
    var existingUser = await _context.Users
        .FirstOrDefaultAsync(u => u.Username == request.Username || u.Email == request.Email);
    if (existingUser != null)
    {
        return false; 
    }

   
    var hashedPassword = _passwordHasher.HashPassword(new User(), request.Password);

    
    var user = new User
    {
        Username = request.Username,
        Email = request.Email,
        PasswordHash = hashedPassword
    };

   
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return true;
}


    public async Task<string> LoginAsync(LoginRequest request)
{
    
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == request.Email);

    if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) != PasswordVerificationResult.Success)
    {
        return null; 
    }

    
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        Issuer = _configuration["Jwt:Issuer"],
        Audience = _configuration["Jwt:Audience"]
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}


 public void Logout()
    {
        
    }

}
}

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Tourfirm.Api.Dto;
using Tourfirm.Domain.data;
using Tourfirm.Domain.models;
using User = Tourfirm.Domain.models.User;

[ApiController]
[Route("[controller]")]
public class AuthController : BaseController
{
    public readonly TourfirmContext _context;
    public readonly PasswordHasher<User> _hasher = new PasswordHasher<User>();

    public AuthController(TourfirmContext context)
    {
        _context = context;
    }


    [HttpPost("/anonymous")]
    public IActionResult Anonymous()
    {
        var user = Tourfirm.Domain.models.User.AnonymousUser();



        var userEntity = _context.Users.Add(user);
        _context.SaveChanges();



        var claims = new List<Claim>
            {
                new Claim("id",userEntity.Entity.Id.ToString()),
                new Claim("isAnonymous",$"{user.IsAnonymous}")
            };
        var claimsIdentity = new ClaimsIdentity(claims, "Token", null, null);

        var now = DateTime.UtcNow;
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: claimsIdentity.Claims,
                expires: now.Add(TimeSpan.FromDays(365)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        var response = new
        {
            data = userEntity.Entity,
            accessToken = encodedJwt,
        };

        return Json(response);
    }

    [HttpPost("/sign-up")]
    public IActionResult SignUp([FromBody] PostSignUp postSignUp)
    {
        var user = _context.Users.FirstOrDefault((user) => user.Phone == postSignUp.Phone || user.NormalizedPhone == postSignUp.Phone);
        if (user is not null)
        {
            return BadRequest(new { errorText = "Такой пользователь уже существует." });
        }

        user = new User(postSignUp.Name, postSignUp.Phone);
        user.PasswordHash = _hasher.HashPassword(user, postSignUp.Password);

        _context.Users.Add(user);
        _context.SaveChanges();

        var identity = GetIdentity(postSignUp.Phone, postSignUp.Password);
        if (identity == null)
        {
            return BadRequest(new { errorText = "Так." });
        }

        var (userData, claims) = identity.Value;

        var currentUserId = GetCurrentUserId();
        var newUserId = GetUserIdFromClaims(claims.Claims);
        if (currentUserId is not null && newUserId is not null)
        {
            AssignAnonymousUserDataForNewUser(currentUserId.Value, newUserId.Value);
        }

        var now = DateTime.UtcNow;
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: claims.Claims,
                expires: now.Add(TimeSpan.FromDays(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        var response = new
        {
            data = userData,
            accessToken = encodedJwt,
        };

        return Json(response);
    }

    [HttpPost("/login")]
    public IActionResult Login([FromBody] PostLogin postLogin)
    {


        var identity = GetIdentity(postLogin.Phone, postLogin.Password);
        if (identity == null)
        {
            return BadRequest(new { errorText = "Неверный логин или пароль." });
        }

        var (userData, claims) = identity.Value;

        var currentUserId = GetCurrentUserId();
        var newUserId = GetUserIdFromClaims(claims.Claims);
        if (currentUserId is not null && newUserId is not null)
        {
            AssignAnonymousUserDataForNewUser(currentUserId.Value, newUserId.Value);
        }

        var now = DateTime.UtcNow;
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: claims.Claims,
                expires: now.Add(TimeSpan.FromDays(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        var response = new
        {
            data = userData,
            accessToken = encodedJwt,
        };

        return Json(response);
    }





    private (User, ClaimsIdentity)? GetIdentity(string userPhone, string password)
    {
        var user = _context.Users.FirstOrDefault((user) => user.Phone == userPhone || user.NormalizedPhone == userPhone);

        if (user is null)
        {
            return null;
        }

        var hasher = new PasswordHasher<User>();
        var verificationResult = hasher.VerifyHashedPassword(user, user.PasswordHash, password);

        if (verificationResult == PasswordVerificationResult.Failed)
        {

            return null;
        }


        if (verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash = hasher.HashPassword(user, password);
            _context.Users.Update(user);
            _context.SaveChanges();
        }


        var claims = new List<Claim>
            {
                new Claim("id",user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name),
                new Claim("phone", user.Phone),
                new Claim("isAnonymous",$"{user.IsAnonymous}")
            };
        ClaimsIdentity claimsIdentity =
        new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, null);

        return (user, claimsIdentity);

    }

    private void AssignAnonymousUserDataForNewUser(int userId, int newUserId)
    {

        var currentUser = _context.Users.Find(userId);

        if (currentUser!.IsAnonymous)
        {
            var userCarts = _context.Carts.Where((cart) => cart.UserId == currentUser.Id);
            var userOrders = _context.Orders.Where((order) => order.UserId == currentUser.Id);

            foreach (var cart in userCarts)
            {
                cart.UserId = newUserId;
            }

            foreach (var order in userOrders)
            {
                order.UserId = newUserId;
            }

            _context.UpdateRange(userCarts, userOrders);
            _context.Users.Remove(currentUser);

            _context.SaveChanges();
        }

    }
}
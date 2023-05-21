using Microsoft.AspNetCore.Mvc;

namespace Tourfirm.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Tourfirm.Api.Dto;
using Tourfirm.Domain.data;
using Tourfirm.Domain.models;

[ApiController]
[Route("[controller]")]
public class AccountController : BaseController
{
    private readonly ILogger<AccountController> _logger;
    private readonly TourfirmContext _context;

    public AccountController(ILogger<AccountController> logger, TourfirmContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = GetCurrentUserId();

        var response = new
        {
            data = _context.Users.FirstOrDefault((user) => user.Id == userId),
        };

        return Json(response);
    }

    [HttpPut]
    [Authorize]
    public IActionResult Put([FromBody] PutUser putUser)
    {
        try
        {
            var userId = GetCurrentUserId();
            var user = _context.Users.FirstOrDefault((user) => user.Id == userId);

            var passwordHasher = new PasswordHasher<User>();
            var passwordHash = passwordHasher.HashPassword(user, putUser.Password);


            putUser.UpdateDomainUser(user, "");
            _context.Update(user);

            _context.SaveChanges();


            var response = new
            {
                data = user,
            };

            return Json(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError,
             new { errorText = "Во время выполнения запроса что-то пошло не так." });
        }
    }
}

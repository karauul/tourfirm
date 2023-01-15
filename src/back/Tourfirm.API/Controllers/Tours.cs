using Microsoft.AspNetCore.Mvc;

namespace Tourfirm.API.Controllers;

using Tourfirm.Domain.data;
using Tourfirm.Domain.models;

[ApiController]
[Route("[controller]")]
public class ToursController : ControllerBase
{
    private readonly ILogger<ToursController> _logger;
    private readonly TourfirmContext _context;

    public ToursController(ILogger<ToursController> logger,TourfirmContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Tour> Get()
    {
     return   _context.Tours.ToList(); 
    }
}

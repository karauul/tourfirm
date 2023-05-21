using Microsoft.AspNetCore.Mvc;

namespace Tourfirm.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Tourfirm.Api.Dto;
using Tourfirm.Domain.data;
using Tourfirm.Domain.models;

[ApiController]
[Route("[controller]")]
public class ToursController : BaseController
{
    private readonly ILogger<ToursController> _logger;
    private readonly TourfirmContext _context;

    public ToursController(ILogger<ToursController> logger, TourfirmContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Tour> Get([FromQuery] GetProducts getProducts)
    {
        // Console.WriteLine("Filters: {0}, {1}", getProducts.Country, getProducts.Stars);


        return _context.Tours
            .Include(tour => tour.Hotel)
            .Include(tour => tour.Country)
            .Where(tour => (getProducts.Stars == null || tour.Hotel.Stars == getProducts.Stars) &&
                            (getProducts.Country == null || tour.Country.Title == getProducts.Country))
            .ToList();

    }

    // [HttpPost]
    // public int Post([FromBody] PostTour tour)
    // {
    //     try
    //     {
    //         var dbTourEntity = _context.Tours.Add(tour.ToDomainTour());
    //         _context.SaveChanges();

    //         return dbTourEntity.Entity.Id;
    //     }
    //     catch (Exception ex)
    //     {
    //         _logger.LogError(ex.ToString());

    //         return -1;
    //     }
    // }

    [HttpPut]
    public bool Put([FromBody] PutTour tour)
    {
        try
        {
            var dbTour = _context.Tours.Find(tour.Id);

            if (dbTour is null) return false;

            tour.UpdateDomainProduct(dbTour);
            _context.Tours.Update(dbTour);
            _context.SaveChanges();

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return false;
        }
    }
}

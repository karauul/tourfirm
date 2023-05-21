using Microsoft.AspNetCore.Mvc;

namespace Tourfirm.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Tourfirm.Api.Dto;
using Tourfirm.Domain.data;
using Tourfirm.Domain.models;

[ApiController]
[Route("[controller]")]
public class CartsController : BaseController
{
    private readonly ILogger<CartsController> _logger;
    private readonly TourfirmContext _context;

    public CartsController(ILogger<CartsController> logger, TourfirmContext context)
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
            data = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered),
        };

        return Json(response);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Post()
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null)
            {
                cart = new Cart(userId!.Value);

                cart = _context.Add(cart).Entity;
                _context.SaveChanges();
            }

            var response = new
            {
                data = cart,
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

    [HttpPost("[controller]/cart-item")]
    [Authorize]
    public IActionResult PostCartItem([FromBody] PostCartItem postCartItem)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null)
            {
                return BadRequest(new { errorText = "Не удалось найти активную корзину для текущего пользователя" });
            }

            var isCartItemAlreadyCurrentCart =
             (cart.CartItems.Any((cartItem) => cartItem.TourId == postCartItem.TourId));
            if (isCartItemAlreadyCurrentCart)
            {
                var cartItem = cart.CartItems.First((CartItem) => CartItem.TourId == postCartItem.TourId);

                if (postCartItem.Amount == 0)
                {
                    cart.CartItems.Remove(cartItem);
                }
                else
                {
                    cartItem.Amount = postCartItem.Amount;
                }
            }
            else
            {
                var tour = _context.Tours.Find(postCartItem.TourId);
                if (tour is null)
                {
                    return BadRequest(new { errorText = "Не удалось найти соответствующий товар." });
                }
                var newCartItem = new CartItem(postCartItem.TourId, postCartItem.Amount, tour.Price);

                var dbCartItem = _context.CartItems.Add(newCartItem).Entity;
                cart.CartItems.Add(dbCartItem);
            }
            _context.Update(cart);
            _context.SaveChanges();

            var response = new
            {
                data = cart,
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

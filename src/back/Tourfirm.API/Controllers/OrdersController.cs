using Microsoft.AspNetCore.Mvc;

namespace Tourfirm.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Tourfirm.Api.Dto;
using Tourfirm.Domain.data;
using Tourfirm.Domain.models;

[ApiController]
[Route("[controller]")]
public class OrdersController : BaseController
{
    private readonly ILogger<OrdersController> _logger;
    private readonly TourfirmContext _context;

    public OrdersController(ILogger<OrdersController> logger, TourfirmContext context)
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
            data = _context.Orders.Where((order) => order.UserId == userId),

        };

        return Json(response);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Post([FromBody] PostOrder order)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.Find(order.CartId);
            if (cart is null)
            {
                return BadRequest(new { errorText = "Не удалось найти корзину для оформления заказа" });
            }

            decimal totalPrice = 0;
            foreach (var cartItem in cart.CartItems)
            {
                totalPrice += cartItem.PricePerOne * cartItem.Amount;
            }


            var orderModel = new Order(userId!.Value, order.CartId, totalPrice);
            var dbOrderEntity = _context.Orders.Add(orderModel);

            cart.IsOrdered = true;
            _context.Update(cart);

            _context.SaveChanges();

            var response = new
            {
                data = dbOrderEntity.Entity.Id,

            };

            return Json(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError, new { errorText = "Во время выполнения запроса что-то пошло не так." });
        }
    }
}

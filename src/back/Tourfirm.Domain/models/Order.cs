namespace Tourfirm.Domain.models;
public class Order
{
    public Order(int id, int userId, int cartId, decimal totalPrice, DateTime creationDate)
    {
        Id = id;
        UserId = userId;
        CartId = cartId;
        TotalPrice = totalPrice;
        CreationDate = creationDate;
    }
    public Order(int userId, int cartId, decimal totalPrice)
    {
        UserId = userId;
        CartId = cartId;
        TotalPrice = totalPrice;
        CreationDate = DateTime.Now;
    }
    protected Order()
    {

    }

    public int Id { get; set; }
    public int UserId { get; set; }
    public int CartId { get; set; }
    public decimal TotalPrice { get; set; }

    public DateTime CreationDate { get; set; }


}
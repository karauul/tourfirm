namespace Tourfirm.Domain.models;
public class Cart
{
    public Cart(int id, int userId, List<CartItem> cartItems, bool isOrdered)
    {
        Id = id;
        UserId = userId;
        CartItems = cartItems;
        IsOrdered = isOrdered;
    }
    public Cart(int userId)
    {
        UserId = userId;
        IsOrdered = false;
    }
    protected Cart()
    {

    }

    public int Id { get; set; }
    public int UserId { get; set; }
    public bool IsOrdered { get; set; }
    public List<CartItem> CartItems { get; set; }

}
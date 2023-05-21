namespace Tourfirm.Api.Dto;
public class PostOrder
{
    public PostOrder(int cartId)
    {
        CartId = cartId;
    }

    public int CartId { get; set; }
}
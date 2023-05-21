using System.Collections.ObjectModel;

namespace Tourfirm.Api.Dto;
public class PostCartItem
{
    public PostCartItem(int tourId, int amount)
    {
        TourId = tourId;
        Amount = amount;
    }

    public int TourId { get; set; }
    public int Amount { get; set; }

}
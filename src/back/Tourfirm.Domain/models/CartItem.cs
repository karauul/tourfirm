namespace Tourfirm.Domain.models;
public class CartItem
{
    public CartItem(int id, int tourId, int amount, decimal pricePerOne)
    {
        Id = id;

        TourId = tourId;
        Amount = amount;
        PricePerOne = pricePerOne;
    }
    public CartItem(int tourId, int amount, decimal pricePerOne)
    {
        TourId = tourId;
        Amount = amount;
        PricePerOne = pricePerOne;
    }
    protected CartItem()
    {

    }

    public int Id { get; set; }
    public int TourId { get; set; }
    public int Amount { get; set; }
    public decimal PricePerOne { get; set; }
}
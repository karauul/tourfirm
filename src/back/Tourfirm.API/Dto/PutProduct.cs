using Tourfirm.Domain.models;

namespace Tourfirm.Api.Dto;
public class PutTour
{
    public PutTour(int id, string image, string title, string description, decimal price)
    {
        Id = id;
        Image = image;
        Title = title;
        Description = description;
        Price = price;
    }


    public int Id { get; set; }
    public string Image { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }

    public void UpdateDomainProduct(Tour tour)
    {
        tour.Image = Image;
        tour.Title = Title;
        tour.Description = Description;
        tour.Price = Price;
    }

}
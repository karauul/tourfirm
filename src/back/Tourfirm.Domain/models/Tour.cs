namespace Tourfirm.Domain.models;
public class Tour
{
    public Tour(int id, string image, string title, string description, decimal price, DateTime startDate, DateTime endDate, int hotel, int country, int availableCount)
    {
        Id = id;
        Image = image;
        Title = title;
        Description = description;
        Price = price;
        StartDate = startDate;
        EndDate = endDate;
        HotelId = hotel;
        CountryId = country;
        AvailableCount = availableCount;

    }
    public Tour(string image, string title, string description, decimal price, DateTime startDate, DateTime endDate, int hotel, int country, int availableCount)
    {
        Image = image;
        Title = title;
        Description = description;
        Price = price;
        StartDate = startDate;
        EndDate = endDate;
        HotelId = hotel;
        CountryId = country;
        AvailableCount = availableCount;

    }
    protected Tour()
    {

    }

    public int Id { get; set; }

    public string Image { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int HotelId { get; set; }
    public Hotel Hotel { get; set; }
    public int CountryId { get; set; }
    public Country Country { get; set; }
    public int AvailableCount { get; set; }

}
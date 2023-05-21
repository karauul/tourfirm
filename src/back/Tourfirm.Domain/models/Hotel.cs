namespace Tourfirm.Domain.models;
public class Hotel
{
    public Hotel(int id, string title, int stars)
    {
        Id = id;
        Title = title;
        Stars = stars;

    }
    public Hotel(string title, int stars)
    {
        Title = title;
        Stars = stars;
    }

    protected Hotel()
    {

    }

    public int Id { get; set; }
    public string Title { get; set; }
    public int Stars { get; set; }
}
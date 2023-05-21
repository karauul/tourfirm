namespace Tourfirm.Domain.models;
public class Country
{
    public Country(int id, string title)
    {
        Id = id;
        Title = title;

    }
    public Country(string title)
    {
        Title = title;


    }

    protected Country()
    {

    }

    public int Id { get; set; }
    public string Title { get; set; }
}

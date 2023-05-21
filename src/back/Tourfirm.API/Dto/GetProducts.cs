namespace Tourfirm.Api.Dto;

public class GetProducts
{
    public GetProducts() { }


    public GetProducts(string? country, int? stars)
    {
        Country = country;
        Stars = stars;
    }

    public string? Country { get; set; }
    public int? Stars { get; set; }
}

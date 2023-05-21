namespace Tourfirm.Api.Dto;

public class PostSignUp
{
    public PostSignUp(string name, string phone, string password)
    {
        Name = name;
        Phone = phone;
        Password = password;
    }

    public string Name { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }

}

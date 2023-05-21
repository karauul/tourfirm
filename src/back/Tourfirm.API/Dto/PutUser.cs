using Tourfirm.Domain.models;

namespace Tourfirm.Api.Dto;
public class PutUser
{
    public PutUser(string name, string phone, string password)
    {
        Name = name;
        Phone = phone;
        Password = password;
    }

    public string Name { get; set; }
    public string Phone { get; set; }

    public string Password { get; set; }
    public void UpdateDomainUser(User user, string passwordHash)
    {
        user.Name = Name;
        user.Phone = Phone;
        user.PasswordHash = passwordHash;
    }

}
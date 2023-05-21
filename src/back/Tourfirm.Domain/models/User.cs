using System.Text.Json.Serialization;

namespace Tourfirm.Domain.models;
public class User
{
    public User(
        int id,
        bool isAnonymous,
        DateTime creationDate,
        string name,
        string phone,
        string normalizedPhone,
        string passwordHash)
    {
        Id = id;
        IsAnonymous = isAnonymous;
        CreationDate = creationDate;
        Name = name;
        Phone = phone;
        NormalizedPhone = normalizedPhone;
        PasswordHash = passwordHash;
    }
    public User(
        string name,
        string phone)
    {
        IsAnonymous = false;
        CreationDate = DateTime.Now;
        Name = name;
        Phone = phone;
        NormalizedPhone = phone;
    }

    public static User AnonymousUser()
    {
        var user = new User();

        user.IsAnonymous = true;
        user.CreationDate = DateTime.Now;
        user.Name = string.Empty;
        user.Phone = string.Empty;
        user.NormalizedPhone = string.Empty;
        user.PasswordHash = string.Empty;

        return user;

    }
    protected User()
    {

    }

    public int Id { get; set; }

    public bool IsAnonymous { get; set; }
    [JsonIgnore]

    public DateTime CreationDate { get; set; }

    public string Name { get; set; }
    public string Phone { get; set; } // +7 (999) - 999 99-99

    public string NormalizedPhone { get; set; } // 9999999999 (without +7/8)
    [JsonIgnore]
    public string PasswordHash { get; set; }



}
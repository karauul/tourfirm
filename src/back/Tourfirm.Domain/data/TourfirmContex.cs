using Microsoft.EntityFrameworkCore;
using Tourfirm.Domain.models;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace Tourfirm.Domain.data;

public class TourfirmContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Tour> Tours { get; set; } = null!;
    public DbSet<CartItem> CartItems { get; set; } = null!;
    public DbSet<Cart> Carts { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<Hotel> Hotels { get; set; } = null!;
    public DbSet<Country> Countries { get; set; } = null!;


    public TourfirmContext(DbContextOptions<TourfirmContext> options) : base(options)
    {
    }



    // public TourfirmContext() : base()
    // {

    // }


    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     optionsBuilder.UseSqlServer("Server=Adel;Database=Tourfirm;Trusted_Connection=True;Trust Server Certificate = true;");
    // }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        var countries = new[] {
                    new Country(1, "Турция"),
                    new Country(2, "Египет"),
                    new Country(3, "Грузия"),
                    new Country(4, "Израиль"),
                    new Country(5, "Таиланд"),
                    new Country(6, "Вьетнам"),
                    new Country(7, "Абхазия"),
                };

        modelBuilder
            .Entity<Country>()
            .HasData(countries);

        var hotels = new[] {
                    new Hotel(1, "Temiz", 5),
                    new Hotel(2, "Park Avrupa Hotel", 3),
                    new Hotel(3, "Green Life", 4),
                    new Hotel(4, "Fortuna Alanya", 5),
                    new Hotel(5, "Nergos Side", 5),
                    new Hotel(6, "Ares Dream", 5),
                    new Hotel(7, "Park Marina", 5),
                };

        modelBuilder.Entity<Hotel>()
            .HasData(hotels);


        var tours = new[] {
                    new Tour(1, "", "Турция", "", 60000, DateTime.Now, DateTime.Now, 1, 1, 50),
                    new Tour(2, "", "Египет", "", 70000, DateTime.Now, DateTime.Now, 2, 2, 50),
                    new Tour(3, "", "Грузия", "", 65000, DateTime.Now, DateTime.Now, 3, 3, 50),
                    new Tour(4, "", "Израиль", "", 85000, DateTime.Now, DateTime.Now, 4, 4, 50),
                    new Tour(5, "", "Таиланд", "", 105000, DateTime.Now, DateTime.Now, 5, 5, 50),
                    new Tour(6, "", "Вьетнам", "", 95000, DateTime.Now, DateTime.Now, 6, 6, 50),
                    new Tour(7, "", "Абхазия", "", 45000, DateTime.Now, DateTime.Now, 7, 7, 50),
                    new Tour(8, "", "Турция", "", 75000, DateTime.Now, DateTime.Now, 1, 1, 50),
                    new Tour(9, "", "Египет", "", 90000, DateTime.Now, DateTime.Now, 2, 2, 50),
                    new Tour(10, "", "Турция", "", 65000, DateTime.Now, DateTime.Now, 1, 1, 50),
                };

        modelBuilder
            .Entity<Tour>()
            .HasData(tours);
    }


}

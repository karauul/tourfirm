using Microsoft.EntityFrameworkCore;
using Tourfirm.Domain.models;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace Tourfirm.Domain.data;

public class TourfirmContext : DbContext
{
public DbSet<Tour> Tours { get; set; } = null!;
public TourfirmContext(DbContextOptions<TourfirmContext> options) : base (options)
{
    Database.EnsureCreated();
}
 protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tour>().HasData(
            new Tour(1, "","Тур","Описание", 10),
            new Tour(2, "","Тур","Описание", 500),
            new Tour(3, "","Тур","Описание", 100000),
            new Tour(4, "","Тур","Описание", 30000)
        );
    }
        
}
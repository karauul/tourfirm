using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Tourfirm.Domain.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsOrdered = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hotels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stars = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsAnonymous = table.Column<bool>(type: "bit", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NormalizedPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    PricePerOne = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItems_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: false),
                    AvailableCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tours_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tours_Hotels_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Hotels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { 1, "Турция" },
                    { 2, "Египет" },
                    { 3, "Грузия" },
                    { 4, "Израиль" },
                    { 5, "Таиланд" },
                    { 6, "Вьетнам" },
                    { 7, "Абхазия" }
                });

            migrationBuilder.InsertData(
                table: "Hotels",
                columns: new[] { "Id", "Stars", "Title" },
                values: new object[,]
                {
                    { 1, 5, "Temiz" },
                    { 2, 3, "Park Avrupa Hotel" },
                    { 3, 4, "Green Life" },
                    { 4, 5, "Fortuna Alanya" },
                    { 5, 5, "Nergos Side" },
                    { 6, 5, "Ares Dream" },
                    { 7, 5, "Park Marina" }
                });

            migrationBuilder.InsertData(
                table: "Tours",
                columns: new[] { "Id", "AvailableCount", "CountryId", "Description", "EndDate", "HotelId", "Image", "Price", "StartDate", "Title" },
                values: new object[,]
                {
                    { 1, 50, 1, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4751), 1, "", 60000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4738), "Турция" },
                    { 2, 50, 2, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4756), 2, "", 70000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4756), "Египет" },
                    { 3, 50, 3, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4758), 3, "", 65000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4758), "Грузия" },
                    { 4, 50, 4, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4760), 4, "", 85000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4759), "Израиль" },
                    { 5, 50, 5, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4761), 5, "", 105000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4760), "Таиланд" },
                    { 6, 50, 6, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4762), 6, "", 95000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4762), "Вьетнам" },
                    { 7, 50, 7, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4763), 7, "", 45000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4763), "Абхазия" },
                    { 8, 50, 1, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4764), 1, "", 75000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4764), "Турция" },
                    { 9, 50, 2, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4765), 2, "", 90000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4765), "Египет" },
                    { 10, 50, 1, "", new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4766), 1, "", 65000m, new DateTime(2023, 5, 19, 21, 26, 21, 213, DateTimeKind.Local).AddTicks(4766), "Турция" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId",
                table: "CartItems",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_CountryId",
                table: "Tours",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_HotelId",
                table: "Tours",
                column: "HotelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Tours");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Hotels");
        }
    }
}

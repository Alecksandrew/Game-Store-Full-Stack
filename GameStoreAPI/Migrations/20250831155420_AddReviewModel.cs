using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GameIgdbId = table.Column<int>(type: "int", nullable: false),
                    GameInventoryIgdbId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Rating = table.Column<double>(type: "float(2)", precision: 2, scale: 1, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.CheckConstraint("CK_Review_Rating_Increments", "[Rating] >= 0.5 AND [Rating] <= 5.0 AND ([Rating] * 2) = CAST(([Rating] * 2) AS INT)");
                    table.ForeignKey(
                        name: "FK_Reviews_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reviews_GamesInventory_GameIgdbId",
                        column: x => x.GameIgdbId,
                        principalTable: "GamesInventory",
                        principalColumn: "IgdbId");
                    table.ForeignKey(
                        name: "FK_Reviews_GamesInventory_GameInventoryIgdbId",
                        column: x => x.GameInventoryIgdbId,
                        principalTable: "GamesInventory",
                        principalColumn: "IgdbId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GameIgdbId",
                table: "Reviews",
                column: "GameIgdbId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GameInventoryIgdbId",
                table: "Reviews",
                column: "GameInventoryIgdbId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");
        }
    }
}

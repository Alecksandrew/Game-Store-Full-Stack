using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixedReviewTableFKigdbId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_GamesInventory_GameIgdbId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "GameIgdbId",
                table: "Reviews",
                newName: "IgdbId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_GameIgdbId",
                table: "Reviews",
                newName: "IX_Reviews_IgdbId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_GamesInventory_IgdbId",
                table: "Reviews",
                column: "IgdbId",
                principalTable: "GamesInventory",
                principalColumn: "IgdbId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_GamesInventory_IgdbId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "IgdbId",
                table: "Reviews",
                newName: "GameIgdbId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_IgdbId",
                table: "Reviews",
                newName: "IX_Reviews_GameIgdbId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_GamesInventory_GameIgdbId",
                table: "Reviews",
                column: "GameIgdbId",
                principalTable: "GamesInventory",
                principalColumn: "IgdbId");
        }
    }
}

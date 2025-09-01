using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class RemoveGameInventoryIgdbIdColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_GamesInventory_GameInventoryIgdbId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_GameInventoryIgdbId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "GameInventoryIgdbId",
                table: "Reviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

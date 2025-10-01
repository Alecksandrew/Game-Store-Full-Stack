using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToGameKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "GameKeys",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameKeys_UserId",
                table: "GameKeys",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameKeys_AspNetUsers_UserId",
                table: "GameKeys",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameKeys_AspNetUsers_UserId",
                table: "GameKeys");

            migrationBuilder.DropIndex(
                name: "IX_GameKeys_UserId",
                table: "GameKeys");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GameKeys");
        }
    }
}

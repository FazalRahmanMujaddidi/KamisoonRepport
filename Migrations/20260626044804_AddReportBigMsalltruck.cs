using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KamisoonRepport.Migrations
{
    /// <inheritdoc />
    public partial class AddReportBigMsalltruck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BigTruckCount",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SmallTruckCount",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BigTruckCount",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "SmallTruckCount",
                table: "Reports");
        }
    }
}

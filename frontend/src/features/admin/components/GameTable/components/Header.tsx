import { Table as TableComponent } from "@/global/components/Table/Table";
import { useGameDashboardContext } from "../../GameDashboard/context";

export function Header() {
  const { handleSort, sortBy, isAscending } = useGameDashboardContext();

  const renderSortArrow = (column: string) => {
    if (sortBy === column) {
      return isAscending ? "🔼" : "🔽";
    }
    return null;
  };

  return (
    <TableComponent.Head>
      <TableComponent.Row className="text-blue-gray">
        <TableComponent.Th
          onClick={() => handleSort("igdbId")}
          className="cursor-pointer w-30"
        >
          ID {renderSortArrow("igdbId")}
        </TableComponent.Th>
        <TableComponent.Th
          onClick={() => handleSort("name")}
          className="cursor-pointer w-64"
        >
          Name {renderSortArrow("name")}
        </TableComponent.Th>
        <TableComponent.Th
          onClick={() => handleSort("price")}
          className="cursor-pointer w-38"
        >
          Price ($) {renderSortArrow("price")}
        </TableComponent.Th>
        <TableComponent.Th
          onClick={() => handleSort("discountPrice")}
          className="cursor-pointer w-48"
        >
          Price with Discount ($) {renderSortArrow("discountPrice")}
        </TableComponent.Th>
        <TableComponent.Th
          onClick={() => handleSort("availableKeys")}
          className="cursor-pointer w-50"
        >
          Keys available {renderSortArrow("availableKeys")}
        </TableComponent.Th>
        <TableComponent.Th className="cursor-pointer w-36">
          Actions
        </TableComponent.Th>
      </TableComponent.Row>
    </TableComponent.Head>
  );
}

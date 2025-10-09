// admin/components/GameDashboardTable/GameDashboardTableHeader.tsx
import { Table } from "@/global/components/Table/index";

type GameDashboardTableHeaderProps = {
  onSort: (column: string) => void;
  sortBy: string;
  isAscending: boolean;
};

export function GameDashboardTableHeader({ onSort, sortBy, isAscending }: GameDashboardTableHeaderProps) {
  const renderSortArrow = (column: string) => {
    if (sortBy === column) {
      return isAscending ? "🔼" : "🔽";
    }
    return null;
  };

  return (
    <Table.Head>
      <Table.Row className="text-blue-gray">
        <Table.Th onClick={() => onSort("igdbId")} className="cursor-pointer w-30">
          ID {renderSortArrow("igdbId")}
        </Table.Th>
        <Table.Th onClick={() => onSort("name")} className="cursor-pointer w-64">
          Name {renderSortArrow("name")}
        </Table.Th>
        <Table.Th onClick={() => onSort("price")} className="cursor-pointer w-38">
          Price ($) {renderSortArrow("price")}
        </Table.Th>
        <Table.Th onClick={() => onSort("discountPrice")} className="cursor-pointer w-48">
          Price with Discount ($) {renderSortArrow("discountPrice")}
        </Table.Th>
        <Table.Th onClick={() => onSort("availableKeys")} className="cursor-pointer w-50">
          Keys available {renderSortArrow("availableKeys")}
        </Table.Th>
        <Table.Th className="cursor-pointer w-[144px]">Actions</Table.Th>
      </Table.Row>
    </Table.Head>
  );
}
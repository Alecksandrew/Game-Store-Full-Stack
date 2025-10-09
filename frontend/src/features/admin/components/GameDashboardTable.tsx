import { Table } from "@/global/components/Table/index";
import useGameDashboardTable from "../hooks/useGameDashboardTable";
import PaginationRounded from "@/global/components/PaginationRounded";
import { SearchForm } from "@/global/components/SearchForm";
import GameDashboardHeader from "./GameDashboardTable/GameDashboardHeader";
import { GameDashboardTableHeader } from "./GameDashboardTable/GameDashboardTableHeader";
import { GameDashboardTableBody } from "./GameDashboardTable/GameDashboardTableBody";

export function GameDashboardTable() {
  const {
    gamesData,
    totalCount,
    isLoading,
    warningType,
    warningComponent,
    currentPage,
    handlePageChange,
    handleSearch,
    handleSort,
    sortBy,
    isAscending,
  } = useGameDashboardTable();

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="p-4 bg-bg-secondary rounded-lg border-blue-gray w-fit min-h-[762px]">
      {warningType === "error" && warningComponent}
      <GameDashboardHeader />

      <SearchForm
        onSubmit={handleSearch}
        placeholder="Search in admin panel..."
      />

      <Table.Root className="text-text-primary table-fixed">
        <GameDashboardTableHeader
          onSort={handleSort}
          sortBy={sortBy}
          isAscending={isAscending}
        />
        <GameDashboardTableBody
          gamesData={gamesData}
          isLoading={isLoading}
          pageSize={10}
        />
      </Table.Root>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center  rounded w-fit p-2 mx-auto">
          <PaginationRounded
            count={totalPages}
            page={currentPage}
            onPageChange={(e, value) => handlePageChange(value)}
          />
        </div>
      )}
    </div>
  );
}

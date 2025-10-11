// src/features/admin/components/GameDashboardTable.tsx
// ... existing imports ...

import { SearchForm } from "@/global/components/SearchForm";
import GameDashboardHeader from "./GameDashboardTable/GameDashboardHeader";
import { GameDashboardTableBody } from "./GameDashboardTable/GameDashboardTableBody";
import { GameDashboardTableHeader } from "./GameDashboardTable/GameDashboardTableHeader";
import { Table } from "@/global/components/Table";
import useGameDashboardTable from "../hooks/useGameDashboardTable";
import { useState } from "react";
import PaginationRounded from "@/global/components/PaginationRounded";

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
    refetch
  } = useGameDashboardTable();

  const [editingGameId, setEditingGameId] = useState<number | null>(null);

  const handleCancel = (gameId: number) => {
    setEditingGameId(null);
  };

  const handleSaveSuccess = () => {
    // Recarrega os dados da tabela após salvar
    refetch();
  };

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
          editingGameId={editingGameId}
          onEdit={setEditingGameId}
    
          onCancel={handleCancel}
          onSaveSuccess={handleSaveSuccess}
        />
      </Table.Root>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center rounded w-fit p-2 mx-auto">
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
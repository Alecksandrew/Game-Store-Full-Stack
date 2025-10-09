import { Table } from "@/global/components/Table/index";
import useGameDashboardTable from "../hooks/useGameDashboardTable";
import GameTableRow from "./GameTableRow/GameTableRow";
import PaginationRounded from "@/global/components/PaginationRounded";
import { Form } from "@/global/components/Form/index";
import { Input } from "@/global/components/Input";
import GameTableRowSkeleton from "./GameTableRow/GameTableRowSkeleton";
import { SearchForm } from "@/global/components/SearchForm";
import GameDashboardHeader from "./GameDashboardTable/GameDashboardHeader";
import { GameDashboardTableHeader } from "./GameDashboardTable/GameDashboardTableHeader";

export function GameDashboardTable() {
  const {
    gamesData, // Renomeado de gamesData para games para corresponder ao hook
    totalCount,
    isLoading,
    warningType,
    warningComponent,
    currentPage,
    handlePageChange,
    handleSearch, // Função para a barra de busca
    handleSort,
    sortBy,
    isAscending,
  } = useGameDashboardTable();

  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / 10);

  const renderTableBody = () => {
    // ESTADO DE CARREGAMENTO
    if (isLoading) {
      // Renderiza 10 linhas de esqueleto para manter a altura
      return Array.from({ length: pageSize }).map((_, index) => (
        <GameTableRowSkeleton key={`skeleton-${index}`} />
      ));
    }

    // ESTADO SEM DADOS
    if (gamesData.length === 0) {
      return (
        <>
          <Table.Row>
            <Table.Td colSpan={6} className="text-center py-10 italic">
              Game not found.
            </Table.Td>
          </Table.Row>
          {/* Preenche o resto do espaço com linhas vazias para manter a altura */}
          {Array.from({ length: pageSize - 1 }).map((_, index) => (
            <Table.Row key={`empty-${index}`}>
              <Table.Td colSpan={6}>&nbsp;</Table.Td>
            </Table.Row>
          ))}
        </>
      );
    }

    // ESTADO COM DADOS
    const emptyRowsCount = pageSize - gamesData.length;
    return (
      <>
        {gamesData.map((game) => (
          <GameTableRow key={game.igdbId} gameInfo={game} />
        ))}
        {emptyRowsCount > 0 &&
          Array.from({ length: emptyRowsCount }).map((_, index) => (
            <Table.Row
              key={`empty-${index}`}
              className="border-t border-gray-700"
            >
              <Table.Td colSpan={6}>&nbsp;</Table.Td>
            </Table.Row>
          ))}
      </>
    );
  };

  return (
    <div className="p-4 bg-bg-secondary rounded-lg border-blue-gray w-fit min-h-[762px]">
      {warningType === "error" && warningComponent}
      <GameDashboardHeader />

      <SearchForm
        onSubmit={handleSearch}
        placeholder="Search in admin panel..."
      />

      <Table.Root className="text-text-primary table-fixed">
        <GameDashboardTableHeader onSort={handleSort}
          sortBy={sortBy}
          isAscending={isAscending}/>
        <Table.Body className="">{renderTableBody()}</Table.Body>
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

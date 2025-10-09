// admin/components/GameDashboardTable/GameDashboardTableBody.tsx
import { Table } from "@/global/components/Table/index";
import GameTableRow from "../GameTableRow/GameTableRow";
import GameTableRowSkeleton from "../GameTableRow/GameTableRowSkeleton";
import type { AdminGame } from "../../types/gameDashboardTypes";

type GameDashboardTableBodyProps = {
  gamesData: AdminGame[];
  isLoading: boolean;
  pageSize: number;
};

export function GameDashboardTableBody({
  gamesData,
  isLoading,
  pageSize,
}: GameDashboardTableBodyProps) {
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

  return <Table.Body className="">{renderTableBody()}</Table.Body>;
}

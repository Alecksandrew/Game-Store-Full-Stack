// src/features/admin/components/GameDashboardTable/GameDashboardTableBody.tsx
import { Table } from "@/global/components/Table/Table";
import GameTableRow from "../GameTableRow/GameTableRow";
import GameTableRowSkeleton from "../GameTableRow/GameTableRowSkeleton";
import type { AdminGame } from "../../types/gameDashboardTypes";

type GameDashboardTableBodyProps = {
  gamesData: AdminGame[];
  isLoading: boolean;
  pageSize: number;
  editingGameId: number | null;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  onSaveSuccess: () => void; // Callback para quando salvar com sucesso
  onOpenKeysModal: (gameId: number, gameName: string) => void;
};

export function GameDashboardTableBody({
  gamesData,
  isLoading,
  pageSize,
  editingGameId,
  onEdit,
  onCancel,
  onSaveSuccess,
  onOpenKeysModal
}: GameDashboardTableBodyProps) {
  
  const renderTableContent = () => {
    // ESTADO DE CARREGAMENTO
    if (isLoading) {
      return Array.from({ length: pageSize }).map((_, index) => (
        <GameTableRowSkeleton key={`skeleton-${index}`} />
      ));
    }

    // ESTADO SEM DADOS
    if (gamesData.length === 0) {
      return (
        <Table.Row>
          <Table.Td colSpan={6} className="text-center py-10 italic">
            Game not found.
          </Table.Td>
        </Table.Row>
      );
    }

    // ESTADO COM DADOS
    return gamesData.map((game) => (
      <GameTableRow
        key={game.igdbId}
        gameInfo={game}
        onEdit={onEdit}
        onCancel={onCancel}
        isEditing={editingGameId === game.igdbId}
        onSaveSuccess={onSaveSuccess}
        onOpenKeysModal={onOpenKeysModal} 
      />
    ));
  };

  return <Table.Body>{renderTableContent()}</Table.Body>;
}
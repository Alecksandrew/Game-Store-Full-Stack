import { Table } from "@/global/components/Table/Table";
import GameTableRowDisplay from "../GameTableRowDisplay";
import GameTableRowEdit from "../GameTableRowEdit";
import GameTableRowSkeleton from "../GameTableRow/GameTableRowSkeleton";
import type { AdminGame } from "../../types/gameDashboardTypes";
import { useUpdateGamePrice } from "../../hooks/useAdmin";

type GameDashboardTableBodyProps = {
  gamesData: AdminGame[];
  isLoading: boolean;
  pageSize: number;
  editingGameId: number | null;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  onSaveSuccess: () => void;
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
  onOpenKeysModal,
}: GameDashboardTableBodyProps) {
  const { handleUpdatePrice, isLoading: isSaving } = useUpdateGamePrice();

  const handleSave = async (data: any) => {
    if (!editingGameId) return;

    try {
      await handleUpdatePrice({
        gameId: editingGameId,
        data: {
          price: Number(data.price),
          discountPrice: Number(data.discountPrice),
        },
      });
      onSaveSuccess();
      onCancel(editingGameId);
    } catch (error) {
      console.error("Error saving game:", error);
    }
  };

  const renderTableContent = () => {
    // LOADING STATE
    if (isLoading) {
      return Array.from({ length: pageSize }).map((_, index) => (
        <GameTableRowSkeleton key={`skeleton-${index}`} />
      ));
    }

    // EMPTY STATE
    if (gamesData.length === 0) {
      return (
        <Table.Row>
          <Table.Td colSpan={6} className="text-center py-10 italic">
            Game not found.
          </Table.Td>
        </Table.Row>
      );
    }

    // DATA STATE
    return gamesData.map((game) => {
      if (game.igdbId === editingGameId) {
        return (
          <GameTableRowEdit
            key={game.igdbId}
            gameInfo={game}
            onSave={handleSave}
            onCancel={() => onCancel(game.igdbId)}
            isLoading={isSaving}
          />
        );
      }
      return (
        <GameTableRowDisplay
          key={game.igdbId}
          gameInfo={game}
          onEdit={onEdit}
          onOpenKeysModal={onOpenKeysModal}
        />
      );
    });
  };

  return <Table.Body>{renderTableContent()}</Table.Body>;
}

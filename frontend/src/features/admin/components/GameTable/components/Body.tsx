import { Table as TableComponent } from "@/global/components/Table/Table";
import { useGameDashboardContext } from "../../GameDashboard/context";
import { useUpdateGamePrice } from "../../../hooks/useAdmin";
import GameTableRowDisplay from "./Rows/RowDisplay";
import GameTableRowEdit from "./Rows/RowEdit";
import GameTableRowSkeleton from "./Rows/RowSkeleton";

const PAGE_SIZE = 10;

export function Body() {
  const {
    gamesData,
    isLoading,
    editingGameId,
    setEditingGameId,
    cancelEditing,
    refreshData,
    openKeysModal,
  } = useGameDashboardContext();

  const { handleUpdatePrice, isLoading: isSaving } = useUpdateGamePrice();

  const handleSave = async (data: { price: number; discountPrice: number }) => {
    if (!editingGameId) return;

    try {
      await handleUpdatePrice({
        gameId: editingGameId,
        data: {
          price: Number(data.price),
          discountPrice: Number(data.discountPrice),
        },
      });
      refreshData();
      cancelEditing();
    } catch (error) {
      console.error("Error saving game:", error);
    }
  };

  const renderTableContent = () => {
    // LOADING STATE
    if (isLoading) {
      return Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <GameTableRowSkeleton key={`skeleton-${index}`} />
      ));
    }

    // EMPTY STATE
    if (gamesData.length === 0) {
      return (
        <TableComponent.Row>
          <TableComponent.Td colSpan={6} className="text-center py-10 italic">
            Game not found.
          </TableComponent.Td>
        </TableComponent.Row>
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
            onCancel={cancelEditing}
            isLoading={isSaving}
          />
        );
      }
      return (
        <GameTableRowDisplay
          key={game.igdbId}
          gameInfo={game}
          onEdit={setEditingGameId}
          onOpenKeysModal={openKeysModal}
        />
      );
    });
  };

  return <TableComponent.Body>{renderTableContent()}</TableComponent.Body>;
}

import { SearchForm } from "@/global/components/SearchForm";
import GameDashboardHeader from "./GameDashboardTable/GameDashboardHeader";
import { GameDashboardTableBody } from "./GameDashboardTable/GameDashboardTableBody";
import { GameDashboardTableHeader } from "./GameDashboardTable/GameDashboardTableHeader";
import { Table } from "@/global/components/Table/Table";

import { useState } from "react";
import PaginationRounded from "@/global/components/PaginationRounded/PaginationRounded";
import KeysModal from "./KeysModal/KeysModal";
import { useGameDashboardTable } from "../hooks/useAdmin";

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
    handleGetInventory
  } = useGameDashboardTable();

  const [editingGameId, setEditingGameId] = useState<number | null>(null);

  const [keysModal, setKeysModal] = useState<{
    isOpen: boolean;
    gameId: number;
    gameName: string;
  }>({
    isOpen: false,
    gameId: 0,
    gameName: ''
  });

  const handleCancel = () => {
    setEditingGameId(null);
  };

  const handleSaveSuccess = () => {
    // Recarrega os dados da tabela após salvar
    handleGetInventory();
  };

  const handleOpenKeysModal = (gameId: number, gameName: string) => {
    setKeysModal({
      isOpen: true,
      gameId,
      gameName
    });
  };

  // Função para fechar o modal de chaves
  const handleCloseKeysModal = () => {
    setKeysModal({
      isOpen: false,
      gameId: 0,
      gameName: ''
    });
  };

  const handleKeysSuccess = () => {
    handleCloseKeysModal();
    handleGetInventory(); // Atualiza a tabela
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <>
    <KeysModal
        isOpen={keysModal.isOpen}
        gameId={keysModal.gameId}
        gameName={keysModal.gameName}
        onClose={handleCloseKeysModal}
        onSuccess={handleKeysSuccess}
      />
    <div className="p-4 bg-bg-secondary rounded-lg border-blue-gray w-fit min-h-[762px] ring-2 ring-primary">
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
          onOpenKeysModal={handleOpenKeysModal}
        />
      </Table.Root>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center rounded w-fit p-2 mx-auto">
          <PaginationRounded
            count={totalPages}
            page={currentPage}
            onPageChange={(_event, value) => handlePageChange(value)}
          />
        </div>
      )}
    </div>
    </>
    
  );
}
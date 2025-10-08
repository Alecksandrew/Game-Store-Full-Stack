import { Table } from "@/global/components/Table/index";
import useGameDashboardTable from "../hooks/useGameDashboardTable";
import GameTableRow from "./GameTableRow";
import Pagination from "@/global/components/Pagination"; // Verifique se o caminho está correto
import CircularProgress from "@mui/material/CircularProgress";

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


  const totalPages = Math.ceil(totalCount / 10);

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <Table.Row>
          <Table.Td colSpan={6} className="text-center py-10">
            <CircularProgress />
          </Table.Td>
        </Table.Row>
      );
    }

    if (gamesData.length === 0) {
      return (
        <Table.Row>
          <Table.Td colSpan={6} className="text-center py-10 italic">
            Nenhum jogo encontrado.
          </Table.Td>
        </Table.Row>
      );
    }

    return gamesData.map((gameData) => <GameTableRow key={gameData.igdbId} gameInfo={gameData}/>);
  };

  return (
    <div className="p-4 bg-bg-secondary rounded-lg border-blue-gray w-fit">
      {warningType === "error" && warningComponent}
      <h1 className="text-2xl text-text-primary ">Games Management</h1>
      <p className="text-blue-gray mb-6">Manage your game catalog and inventory</p>
      
    
      {/* <SearchBar onSearch={handleSearch} /> */}

      <Table.Root className="text-text-primary">
        <Table.Head>
          <Table.Row className="text-blue-gray">
            {/* Adiciona evento de clique para ordenação e um indicador visual */}
            <Table.Th onClick={() => handleSort("igdbId")} className="cursor-pointer">
              ID {sortBy === 'igdbId' && (isAscending ? '🔼' : '🔽')}
            </Table.Th>
            <Table.Th onClick={() => handleSort("name")} className="cursor-pointer">
              Name {sortBy === 'name' && (isAscending ? '🔼' : '🔽')}
            </Table.Th>
            <Table.Th onClick={() => handleSort("price")} className="cursor-pointer">
              Price ($){sortBy === 'price' && (isAscending ? '🔼' : '🔽')}
            </Table.Th>
            <Table.Th onClick={() => handleSort("discountPrice")} className="cursor-pointer">
              Price with Discount ($) {sortBy === 'discountPrice' && (isAscending ? '🔼' : '🔽')}
            </Table.Th>
            <Table.Th onClick={() => handleSort("availableKeys")} className="cursor-pointer">
              Keys available {sortBy === 'availableKeys' && (isAscending ? '🔼' : '🔽')}
            </Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {renderTableBody()}
        </Table.Body>
      </Table.Root>

      {totalPages > 1 && (
        <div className="mx-auto flex justify-center bg-primary rounded w-fit p-2">
          <Pagination
            count={totalPages}
            page={currentPage}
            onPageChange={(e, value) => handlePageChange(value)}
            
          />
        </div>
      )}
    </div>
  );
}
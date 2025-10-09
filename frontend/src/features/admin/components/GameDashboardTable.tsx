import { Table } from "@/global/components/Table/index";
import useGameDashboardTable from "../hooks/useGameDashboardTable";
import GameTableRow from "./GameTableRow";
import PaginationRounded from "@/global/components/PaginationRounded"; // Verifique se o caminho está correto
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "@/global/components/Skeleton";
import SearchGameForm from "@/features/Home/components/SearchGameForm";
import { Form } from "@/global/components/Form/index";
import { Input } from "@/global/components/Input";

function GameTableRowSkeleton() {
  return (
    <Table.Row className="border-t py-10  border-blue-gray">
      <Table.Td>
        <Skeleton className="h-6 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-6 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-6 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-6 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-6 w-full" />
      </Table.Td>
      <Table.Td>
        <Skeleton className="h-6 w-full" />
      </Table.Td>
    </Table.Row>
  );
}

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
              Nenhum jogo encontrado.
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
      <h1 className="text-2xl text-text-primary ">Games Management</h1>
      <p className="text-blue-gray mb-6">
        Manage your game catalog and inventory
      </p>

      <Form.Root onSubmit={handleSearch} className="flex gap-4 mb-4">
        <Form.Content className="w-full">
          <Input name="gameName" type="text"/>
        </Form.Content>
        <Form.Actions className="mt-0">
          <Form.Button title="Search games" type="submit" className="whitespace-nowrap mt-0" />
        </Form.Actions>
      </Form.Root>

      <Table.Root className="text-text-primary table-fixed">
        <Table.Head>
          <Table.Row className="text-blue-gray">
            {/* Adiciona evento de clique para ordenação e um indicador visual */}
            <Table.Th
              onClick={() => handleSort("igdbId")}
              className="cursor-pointer w-30"
            >
              ID {sortBy === "igdbId" && (isAscending ? "🔼" : "🔽")}
            </Table.Th>
            <Table.Th
              onClick={() => handleSort("name")}
              className="cursor-pointer w-64"
            >
              Name {sortBy === "name" && (isAscending ? "🔼" : "🔽")}
            </Table.Th>
            <Table.Th
              onClick={() => handleSort("price")}
              className="cursor-pointer w-38"
            >
              Price ($){sortBy === "price" && (isAscending ? "🔼" : "🔽")}
            </Table.Th>
            <Table.Th
              onClick={() => handleSort("discountPrice")}
              className="cursor-pointer w-48"
            >
              Price with Discount ($){" "}
              {sortBy === "discountPrice" && (isAscending ? "🔼" : "🔽")}
            </Table.Th>
            <Table.Th
              onClick={() => handleSort("availableKeys")}
              className="cursor-pointer w-50"
            >
              Keys available{" "}
              {sortBy === "availableKeys" && (isAscending ? "🔼" : "🔽")}
            </Table.Th>
            <Table.Th className="cursor-pointer w-[144px]">Actions</Table.Th>
          </Table.Row>
        </Table.Head>
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

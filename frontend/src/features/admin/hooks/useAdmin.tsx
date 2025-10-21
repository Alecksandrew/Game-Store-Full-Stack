import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { adminService } from "@/global/services/admin/adminService";
import type {
  GetInventoryRequest,
  GetInventoryResponse,
  UpdatePriceRequest,
  UpdatePriceResponse,
  AddKeysRequest,
  AddKeysResponse,
} from "@/global/services/admin/types";
import { useCallback, useState, useMemo, useEffect } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";

export function useGameDashboardTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("igdbId");
  const [isAscending, setIsAscending] = useState(true);

  const requestParams = useMemo(
    (): GetInventoryRequest => ({
      page: currentPage,
      pageSize: 10,
      search: searchTerm || undefined,
      sortBy: sortBy,
      ascending: isAscending,
    }),
    [currentPage, searchTerm, sortBy, isAscending]
  );

  const { executeRequest, data, isLoading, ...rest } = useRequestHandler<
    GetInventoryRequest,
    GetInventoryResponse
  >(adminService.getInventory);

  const handleGetInventory = useCallback(() => {
    executeRequest(requestParams);
  }, [executeRequest, requestParams]);

  useEffect(() => {
    handleGetInventory();
  }, [handleGetInventory]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch: SubmitHandler<FieldValues> = (formData) => {
    setSearchTerm(formData.gameName ?? "");
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setIsAscending(!isAscending);
    } else {
      setSortBy(column);
      setIsAscending(true);
    }
    setCurrentPage(1);
  };

  return {
    gamesData: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    handleGetInventory,
    currentPage,
    handlePageChange,
    handleSearch,
    handleSort,
    sortBy,
    isAscending,
    ...rest,
  };
}

export function useUpdateGamePrice() {
  const { executeRequest: handleUpdatePrice, ...rest } = useRequestHandler<
    UpdatePriceRequest,
    UpdatePriceResponse
  >(adminService.updateGamePrice);

  return { handleUpdatePrice, ...rest };
}

export function useAddKeys() {
  const { executeRequest: handleAddKeys, ...rest } = useRequestHandler<
    AddKeysRequest,
    AddKeysResponse
  >(adminService.addKeys);

  return { handleAddKeys, ...rest };
}

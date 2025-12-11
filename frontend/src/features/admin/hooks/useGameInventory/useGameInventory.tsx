import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { adminService } from "@/global/services/admin/adminService";
import type {
  GetInventoryRequest,
  GetInventoryResponse,
} from "@/global/services/admin/types";
import { useCallback, useEffect, useMemo } from "react";
import type { UseGameInventoryProps } from "./types";

export function useGameInventory({
  currentPage,
  searchTerm,
  sortBy,
  isAscending,
}: UseGameInventoryProps) {
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

  return {
    gamesData: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    handleGetInventory,
    ...rest,
  };
}

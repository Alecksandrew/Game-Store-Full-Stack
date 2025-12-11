import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { adminService } from "@/global/services/admin/adminService";
import type {
  UpdatePriceRequest,
  UpdatePriceResponse,
} from "@/global/services/admin/types";

export function useUpdateGamePrice() {
  const { executeRequest: handleUpdatePrice, ...rest } = useRequestHandler<
    UpdatePriceRequest,
    UpdatePriceResponse
  >(adminService.updateGamePrice);

  return { handleUpdatePrice, ...rest };
}

import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { adminService } from "@/global/services/admin/adminService";
import type {
  AddKeysRequest,
  AddKeysResponse,
} from "@/global/services/admin/types";

export function useAddKeys() {
  const { executeRequest: handleAddKeys, ...rest } = useRequestHandler<
    AddKeysRequest,
    AddKeysResponse
  >(adminService.addKeys);

  return { handleAddKeys, ...rest };
}

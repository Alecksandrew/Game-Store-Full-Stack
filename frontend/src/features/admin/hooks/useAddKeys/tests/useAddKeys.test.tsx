import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useAddKeys } from "../useAddKeys";
import { adminService } from "@/global/services/admin/adminService";

vi.mock("@/global/services/admin/adminService", () => ({
  adminService: {
    addKeys: vi.fn(),
  },
}));

describe("useAddKeys", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (adminService.addKeys as Mock).mockResolvedValue({});
  });

  it("should call adminService.addKeys when handleAddKeys is called", async () => {
    const { result } = renderHook(() => useAddKeys());

    const mockData = { gameId: 1, data: { keys: ["KEY1"] } };

    await result.current.handleAddKeys(mockData);

    expect(adminService.addKeys).toHaveBeenCalledWith(mockData);
  });
});

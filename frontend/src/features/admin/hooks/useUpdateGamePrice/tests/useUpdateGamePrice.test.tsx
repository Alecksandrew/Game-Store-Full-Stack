import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useUpdateGamePrice } from "../useUpdateGamePrice";
import { adminService } from "@/global/services/admin/adminService";

vi.mock("@/global/services/admin/adminService", () => ({
  adminService: {
    updateGamePrice: vi.fn(),
  },
}));

describe("useUpdateGamePrice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (adminService.updateGamePrice as Mock).mockResolvedValue({});
  });

  it("should call adminService.updateGamePrice when handleUpdatePrice is called", async () => {
    const { result } = renderHook(() => useUpdateGamePrice());

    const mockData = { gameId: 1, data: { price: 10, discountPrice: 5 } };

    await result.current.handleUpdatePrice(mockData);

    expect(adminService.updateGamePrice).toHaveBeenCalledWith(mockData);
  });
});

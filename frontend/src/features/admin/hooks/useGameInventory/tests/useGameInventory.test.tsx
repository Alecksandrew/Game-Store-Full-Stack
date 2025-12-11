import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useGameInventory } from "../useGameInventory";
import { adminService } from "@/global/services/admin/adminService";

// Mock do serviço
vi.mock("@/global/services/admin/adminService", () => ({
  adminService: {
    getInventory: vi.fn(),
  },
}));

describe("useGameInventory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (adminService.getInventory as Mock).mockResolvedValue({
      items: [],
      totalCount: 0,
    });
  });

  it("should fetch inventory on mount", async () => {
    renderHook(() =>
      useGameInventory({
        currentPage: 1,
        searchTerm: "",
        sortBy: "igdbId",
        isAscending: true,
      })
    );

    await waitFor(() => {
      expect(adminService.getInventory).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        search: undefined,
        sortBy: "igdbId",
        ascending: true,
      });
    });
  });

  it("should fetch inventory with search term", async () => {
    renderHook(() =>
      useGameInventory({
        currentPage: 1,
        searchTerm: "Zelda",
        sortBy: "igdbId",
        isAscending: true,
      })
    );

    await waitFor(() => {
      expect(adminService.getInventory).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        search: "Zelda",
        sortBy: "igdbId",
        ascending: true,
      });
    });
  });

  it("should fetch inventory when page changes", async () => {
    const { rerender } = renderHook((props) => useGameInventory(props), {
      initialProps: {
        currentPage: 1,
        searchTerm: "",
        sortBy: "igdbId",
        isAscending: true,
      },
    });

    await waitFor(() => {
      expect(adminService.getInventory).toHaveBeenCalledTimes(1);
    });

    rerender({
      currentPage: 2,
      searchTerm: "",
      sortBy: "igdbId",
      isAscending: true,
    });

    await waitFor(() => {
      expect(adminService.getInventory).toHaveBeenCalledWith({
        page: 2,
        pageSize: 10,
        search: undefined,
        sortBy: "igdbId",
        ascending: true,
      });
    });
  });
});

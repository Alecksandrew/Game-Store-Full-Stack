import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useGameDashboardTable } from "../useGameDashboardTable";
import { adminService } from "@/global/services/admin/adminService";

// Mock do serviço
vi.mock("@/global/services/admin/adminService", () => ({
  adminService: {
    getInventory: vi.fn(),
    updateGamePrice: vi.fn(),
    addKeys: vi.fn(),
  },
}));

describe("useGameDashboardTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock implementation padrão
    (adminService.getInventory as Mock).mockResolvedValue({
      items: [],
      totalCount: 0,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGameDashboardTable());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.sortBy).toBe("igdbId");
    expect(result.current.isAscending).toBe(true);
    expect(result.current.gamesData).toEqual([]);
  });

  it("should update page", () => {
    const { result } = renderHook(() => useGameDashboardTable());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should reset page when searching", () => {
    const { result } = renderHook(() => useGameDashboardTable());

    // Muda para página 2
    act(() => {
      result.current.handlePageChange(2);
    });

    // Faz uma busca
    act(() => {
      result.current.handleSearch({ gameName: "Zelda" });
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should toggle sort order when clicking same column", () => {
    const { result } = renderHook(() => useGameDashboardTable());

    // Default is igdbId ASC
    expect(result.current.sortBy).toBe("igdbId");
    expect(result.current.isAscending).toBe(true);

    // Click igdbId again -> DESC
    act(() => {
      result.current.handleSort("igdbId");
    });

    expect(result.current.sortBy).toBe("igdbId");
    expect(result.current.isAscending).toBe(false);
  });

  it("should change sort column and reset to ASC when clicking new column", () => {
    const { result } = renderHook(() => useGameDashboardTable());

    // Click name -> name ASC
    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortBy).toBe("name");
    expect(result.current.isAscending).toBe(true);
  });
});

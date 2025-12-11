import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import {
  GameDashboardProvider,
  useGameDashboardContext,
} from "../GameDashboardContext";
import * as useGameDashboardTableHook from "../../../../hooks/useGameDashboardTable";

// Mock do hook useGameDashboardTable
vi.mock("../../../../hooks/useGameDashboardTable", () => ({
  useGameDashboardTable: vi.fn(),
}));

describe("GameDashboardContext", () => {
  const mockHandleGetInventory = vi.fn();
  const mockHandlePageChange = vi.fn();
  const mockHandleSearch = vi.fn();
  const mockHandleSort = vi.fn();

  const defaultHookValues = {
    gamesData: [],
    totalCount: 0,
    isLoading: false,
    warningType: null,
    warningComponent: null,
    currentPage: 1,
    sortBy: "igdbId",
    isAscending: true,
    handleGetInventory: mockHandleGetInventory,
    handlePageChange: mockHandlePageChange,
    handleSearch: mockHandleSearch,
    handleSort: mockHandleSort,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useGameDashboardTableHook.useGameDashboardTable as Mock).mockReturnValue(
      defaultHookValues
    );
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <GameDashboardProvider>{children}</GameDashboardProvider>
  );

  it("should provide values from useGameDashboardTable", () => {
    const { result } = renderHook(() => useGameDashboardContext(), { wrapper });

    expect(result.current.gamesData).toEqual([]);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.isLoading).toBe(false);
  });

  it("should manage keys modal state", () => {
    const { result } = renderHook(() => useGameDashboardContext(), { wrapper });

    expect(result.current.keysModal.isOpen).toBe(false);

    act(() => {
      result.current.openKeysModal(1, "Test Game");
    });

    expect(result.current.keysModal.isOpen).toBe(true);
    expect(result.current.keysModal.gameId).toBe(1);
    expect(result.current.keysModal.gameName).toBe("Test Game");

    act(() => {
      result.current.closeKeysModal();
    });

    expect(result.current.keysModal.isOpen).toBe(false);
    expect(result.current.keysModal.gameId).toBe(0);
    expect(result.current.keysModal.gameName).toBe("");
  });

  it("should manage editing game id state", () => {
    const { result } = renderHook(() => useGameDashboardContext(), { wrapper });

    expect(result.current.editingGameId).toBeNull();

    act(() => {
      result.current.setEditingGameId(123);
    });

    expect(result.current.editingGameId).toBe(123);

    act(() => {
      result.current.cancelEditing();
    });

    expect(result.current.editingGameId).toBeNull();
  });

  it("should call handleGetInventory when refreshData is called", () => {
    const { result } = renderHook(() => useGameDashboardContext(), { wrapper });

    act(() => {
      result.current.refreshData();
    });

    expect(mockHandleGetInventory).toHaveBeenCalled();
  });

  it("should throw error if used outside provider", () => {
    // Suppress console.error for this test as React logs errors when catching boundaries
    const consoleSpy = vi.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      renderHook(() => useGameDashboardContext());
    }).toThrow(
      "useGameDashboardContext must be used within GameDashboardProvider"
    );

    consoleSpy.mockRestore();
  });
});

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useGameDashboardUI } from "../useGameDashboardUI";

describe("useGameDashboardUI", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGameDashboardUI());

    expect(result.current.editingGameId).toBeNull();
    expect(result.current.keysModal.isOpen).toBe(false);
    expect(result.current.keysModal.gameId).toBe(0);
    expect(result.current.keysModal.gameName).toBe("");
  });

  it("should manage editing game id state", () => {
    const { result } = renderHook(() => useGameDashboardUI());

    act(() => {
      result.current.setEditingGameId(123);
    });

    expect(result.current.editingGameId).toBe(123);

    act(() => {
      result.current.cancelEditing();
    });

    expect(result.current.editingGameId).toBeNull();
  });

  it("should manage keys modal state", () => {
    const { result } = renderHook(() => useGameDashboardUI());

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
});

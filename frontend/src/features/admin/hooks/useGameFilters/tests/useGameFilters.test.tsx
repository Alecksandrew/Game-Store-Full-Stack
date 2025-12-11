import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useGameFilters } from "../useGameFilters";

describe("useGameFilters", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGameFilters());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.searchTerm).toBe("");
    expect(result.current.sortBy).toBe("igdbId");
    expect(result.current.isAscending).toBe(true);
  });

  it("should update page", () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should update search term and reset page", () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.handlePageChange(2);
    });

    act(() => {
      result.current.handleSearch({ gameName: "Zelda" });
    });

    expect(result.current.searchTerm).toBe("Zelda");
    expect(result.current.currentPage).toBe(1);
  });

  it("should toggle sort order when clicking same column", () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.handleSort("igdbId");
    });

    expect(result.current.sortBy).toBe("igdbId");
    expect(result.current.isAscending).toBe(false);

    act(() => {
      result.current.handleSort("igdbId");
    });

    expect(result.current.isAscending).toBe(true);
  });

  it("should change sort column and reset to ASC when clicking new column", () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortBy).toBe("name");
    expect(result.current.isAscending).toBe(true);
  });
});

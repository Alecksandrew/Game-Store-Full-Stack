import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useParams } from "react-router";
import { useRequestHandler } from "@/global/hooks/useRequestHandler";
import { placeholderGameData } from "../../../contexts/GameDetailsDataContext";
import { useGameDetails } from "../useGameDetails";
import type { GameDetailsApiResponse } from "../../../types/GameDetailsType";

// Mock das dependências
vi.mock("react-router", () => ({
  useParams: vi.fn(),
}));

vi.mock("@/global/hooks/useRequestHandler", () => ({
  useRequestHandler: vi.fn(),
}));

const mockGameId = "123";
const mockGameDetails: GameDetailsApiResponse = {
  id: 123,
  name: "The Witcher 3: Wild Hunt",
  summary: "A fantastic RPG.",
  genres: ["RPG"],
  firstReleaseDate: "2015-05-19",
  coverUrl: "url_to_cover",
  screenshotsImageUrl: ["url_to_screenshot"],
  platforms: ["PC"],
  videos: ["url_to_video"],
  price: 39.99,
  discountPrice: 29.99,
  totalSells: 1000,
  availableKeysStock: 50,
  involvedCompanies: {
    developers: ["CD Projekt Red"],
    publishers: ["CD Projekt Red"],
  },
  gameModes: ["Single-player"],
  similarGames: [
    {
      id: 456,
      coverUrl: "url_to_similar_game_cover",
      name: "Similar Game",
    },
  ],
};

describe("useGameDetails Hook", () => {
  const mockExecuteRequest = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as vi.Mock).mockReturnValue({ id: mockGameId });
  });

  it("should return loading state and call the data fetch function", () => {
    (useRequestHandler as vi.Mock).mockReturnValue({
      executeRequest: mockExecuteRequest,
      data: null,
      isLoading: true,
      warningType: "success",
      warningComponent: null,
    });

    const { result } = renderHook(() => useGameDetails());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.gameDetails).toBe(placeholderGameData);
    expect(result.current.gameId).toBe(mockGameId);
    expect(mockExecuteRequest).toHaveBeenCalledWith(mockGameId);
  });

  it("should return game details on successful fetch", async () => {
    (useRequestHandler as vi.Mock).mockReturnValue({
      executeRequest: mockExecuteRequest,
      data: mockGameDetails,
      isLoading: false,
      warningType: "success",
      warningComponent: null,
    });

    const { result } = renderHook(() => useGameDetails());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.gameDetails).toEqual(mockGameDetails);
    });
  });

  it("should return warning properties on fetch failure", async () => {
    const mockWarningComponent = <div>Error!</div>;
    (useRequestHandler as vi.Mock).mockReturnValue({
      executeRequest: mockExecuteRequest,
      data: null,
      isLoading: false,
      warningType: "error",
      warningComponent: mockWarningComponent,
    });

    const { result } = renderHook(() => useGameDetails());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.warningType).toBe("error");
      expect(result.current.warningComponent).toEqual(mockWarningComponent);
      expect(result.current.gameDetails).toBe(placeholderGameData);
    });
  });

  it("should return placeholder data if the API returns no data", async () => {
    (useRequestHandler as vi.Mock).mockReturnValue({
      executeRequest: mockExecuteRequest,
      data: null,
      isLoading: false,
      warningType: "success",
      warningComponent: null,
    });

    const { result } = renderHook(() => useGameDetails());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.gameDetails).toBe(placeholderGameData);
    });
  });

  it("should not call the fetch function if the game ID does not exist", () => {
    (useParams as vi.Mock).mockReturnValue({ id: undefined });
    (useRequestHandler as vi.Mock).mockReturnValue({
      executeRequest: mockExecuteRequest,
      data: null,
      isLoading: false,
      warningType: "success",
      warningComponent: null,
    });

    const { result } = renderHook(() => useGameDetails());

    expect(mockExecuteRequest).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.gameDetails).toBe(placeholderGameData);
    expect(result.current.gameId).toBeUndefined();
  });

  it("should refetch data when the game ID changes", () => {
    (useParams as vi.Mock).mockReturnValue({ id: "123" });
    const { rerender } = renderHook(() => useGameDetails());

    expect(mockExecuteRequest).toHaveBeenCalledWith("123");
    expect(mockExecuteRequest).toHaveBeenCalledTimes(1);

    (useParams as vi.Mock).mockReturnValue({ id: "456" });
    rerender();

    expect(mockExecuteRequest).toHaveBeenCalledWith("456");
    expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
  });
});
import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useContext, type ReactNode } from "react";
import type { GameCardData } from "@/global/components/GameCard/types";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import { WishlistContext } from "../WishlistContext";
import {
  useAddToWishlist,
  useGetWishlist,
  useRemoveFromWishlist,
} from "../../hooks/useWishlist";
import { WishlistProvider } from "../WishlistProvider";

// Dados Falsos
const game1: GameCardData = {
  id: 1,
  name: "Game 1",
  coverUrl: "url1",
  price: 50,
};
const game2: GameCardData = {
  id: 2,
  name: "Game 2",
  coverUrl: "url2",
  price: 60,
};

// custom hooks mocks
vi.mock("../../hooks/useWishlist");

// Crie os mocks FORA do beforeEach
const mockHandleGetWishlist = vi.fn();
const mockHandleRemoveFromWishlist = vi.fn();
const mockHandleAddToWishlist = vi.fn();
const mockSetWishlist = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(useGetWishlist).mockReturnValue({
    data: null,
    isLoading: false,
    handleGetWishlist: mockHandleGetWishlist,
    setData: mockSetWishlist,
    warningComponent: <></>,
    warningType: "success",
  });

  vi.mocked(useRemoveFromWishlist).mockReturnValue({
    handleRemoveFromWishlist: mockHandleRemoveFromWishlist,
    data: null,
    isLoading: false,
    warningComponent: <></>,
    warningType: "success",
    setData: vi.fn(),
  });

  vi.mocked(useAddToWishlist).mockReturnValue({
    handleAddToWishlist: mockHandleAddToWishlist,
    data: null,
    isLoading: false,
    warningComponent: <></>,
    warningType: "success",
    setData: vi.fn(),
  });

  mockHandleRemoveFromWishlist.mockResolvedValue(undefined);
  mockHandleAddToWishlist.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const createWrapper =
  (isLoggedIn: boolean): React.FC<{ children: ReactNode }> =>
  ({ children }) =>
    (
      <MyAccountContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          myAccountData: null,
          isLoading: false,
          handleLogout: vi.fn(),
          handleLoginSuccess: vi.fn(),
        }}
      >
        <WishlistProvider>{children}</WishlistProvider>
      </MyAccountContext.Provider>
    );

const renderWishlist = (isLoggedIn: boolean) => {
  return renderHook(() => useContext(WishlistContext), {
    wrapper: createWrapper(isLoggedIn),
  });
};

describe("WishlistProvider", () => {
  describe("Authentication logic", () => {
    it("It should load wishlist if the user is logged in", () => {
      renderWishlist(true);

      expect(mockHandleGetWishlist).toHaveBeenCalledTimes(1);
    });

    it("It should not load the wishlist and should clear the state if the user is logged out", () => {
      renderWishlist(false);

      expect(mockHandleGetWishlist).not.toHaveBeenCalled();

      expect(mockSetWishlist).toHaveBeenCalledWith(null);
    });
  });

  describe("Optimistic update", () => {
    it("It should revert the state upon failing to remove an item (Optimistic Revert)", async () => {
      const originalWishlist = [game1, game2];

      vi.mocked(useGetWishlist).mockReturnValue({
        data: originalWishlist,
        isLoading: false,
        handleGetWishlist: mockHandleGetWishlist,
        setData: mockSetWishlist,
        warningComponent: <></>,
        warningType: "success",
      });

      const apiError = new Error("API Falhou");
      mockHandleRemoveFromWishlist.mockRejectedValue(apiError);

      const { result } = renderWishlist(true);

      await act(async () => {
        await result.current.removeGameFromWishlist(game1.id);
      });

      expect(mockSetWishlist).toHaveBeenCalledTimes(2);
      expect(mockSetWishlist).toHaveBeenNthCalledWith(1, expect.any(Function));
      expect(mockSetWishlist).toHaveBeenNthCalledWith(2, originalWishlist);
    });

    it("It should revert the state when failing to add an item (Optimistic Revert)", async () => {
      const originalWishlist: GameCardData[] = [];
      vi.mocked(useGetWishlist).mockReturnValue({
        data: originalWishlist,
        isLoading: false,
        handleGetWishlist: mockHandleGetWishlist,
        setData: mockSetWishlist,
        warningComponent: <></>,
        warningType: "success",
      });

      const apiError = new Error("API Falhou");
      mockHandleAddToWishlist.mockRejectedValue(apiError);

      const { result } = renderWishlist(true);

      await act(async () => {
        await result.current.addToWishlist(game1);
      });

      expect(mockSetWishlist).toHaveBeenCalledTimes(2);
      expect(mockSetWishlist).toHaveBeenNthCalledWith(2, originalWishlist);
    });

    it("It should successfully remove an item on API success", async () => {
      const originalWishlist = [game1, game2];

      vi.mocked(useGetWishlist).mockReturnValue({
        data: originalWishlist,
        isLoading: false,
        handleGetWishlist: mockHandleGetWishlist,
        setData: mockSetWishlist,
        warningComponent: <></>,
        warningType: "success",
      });

      const { result } = renderWishlist(true);

      await act(async () => {
        await result.current.removeGameFromWishlist(game1.id);
      });

      expect(mockHandleRemoveFromWishlist).toHaveBeenCalledWith(game1.id);
      expect(mockSetWishlist).toHaveBeenCalledTimes(1);
    });

    it("It should successfully add an item on API success", async () => {
      const originalWishlist: GameCardData[] = [];

      vi.mocked(useGetWishlist).mockReturnValue({
        data: originalWishlist,
        isLoading: false,
        handleGetWishlist: mockHandleGetWishlist,
        setData: mockSetWishlist,
        warningComponent: <></>,
        warningType: "success",
      });

      const { result } = renderWishlist(true);

      await act(async () => {
        await result.current.addToWishlist(game1);
      });

      expect(mockHandleAddToWishlist).toHaveBeenCalledWith(game1.id);
      expect(mockSetWishlist).toHaveBeenCalledTimes(1);
    });
  });
});

import type { GameCardData } from "@/global/components/GameCard";
import { createContext } from "react";

type WishlistContextType = {
  wishlist: GameCardData[];
  isLoading: boolean;
  fetchWishlist: () => void;
  removeGameFromWishlist:(gameId: number) => Promise<void>;
  addToWishlist: (gameData: GameCardData) => Promise<void>;
};


export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  isLoading: true,
  fetchWishlist: () => {},
  removeGameFromWishlist: async () => {},
  addToWishlist: async () => {}
});

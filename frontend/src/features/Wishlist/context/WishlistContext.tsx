import type { GameCardData } from "@/global/components/GameCard";
import { createContext } from "react";

type WishlistContextType = {
  wishlist: GameCardData[];
  isLoading: boolean;
  refetchWishlist: () => void;
  removeGameFromWishlist: (gameId: number) => void;
};


export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  isLoading: true,
  refetchWishlist: () => {},
  removeGameFromWishlist: () => {},
});

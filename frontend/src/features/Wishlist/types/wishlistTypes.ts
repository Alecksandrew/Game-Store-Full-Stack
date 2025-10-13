import type { GameCardData } from "@/global/components/GameCard/types";

export type WishlistContextType = {
  wishlist: GameCardData[];
  isLoading: boolean;
  refetchWishlist: () => void;
  removeGameFromWishlist: (gameId: number) => void;
};


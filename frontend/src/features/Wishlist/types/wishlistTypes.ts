import type { GameCardData } from "@/features/Home/types/GameCardType";

export type WishlistContextType = {
  wishlist: GameCardData[];
  isLoading: boolean;
  refetchWishlist: () => void;
  removeGameFromWishlist: (gameId: number) => void;
};


import { createContext } from "react";
import type { WishlistContextType } from "../types/wishlistTypes";

export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  isLoading: true,
  refetchWishlist: () => {},
  removeGameFromWishlist: () => {},
});

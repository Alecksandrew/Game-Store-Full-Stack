import { createContext } from "react";

export type WishlistContextType = {
  wishlist: number[];
  isLoading: boolean;
  refetchWishlist: () => void;
};


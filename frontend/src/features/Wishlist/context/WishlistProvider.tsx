import { useContext, useEffect, type ReactNode } from "react";
import { WishlistContext } from "./WishlistContext";
import {
  useAddToWishlist,
  useGetWishlist,
  useRemoveFromWishlist,
} from "../hooks/useWishlist";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import type { GameCardData } from "@/global/components/GameCard";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useContext(MyAccountContext);
  
  const {
    data: wishlist,
    execute: fetchWishlist,
    isLoading,
    setData: setWishlist,
  } = useGetWishlist();
  const { execute: executeRemoveFromWishlist } = useRemoveFromWishlist();
  const { execute: executeAddToWishlist } = useAddToWishlist();

  const removeGameFromWishlist = async (gameId: number) => {
    // Storing the original state, because i will try optimistic UI technique
    const originalWishlist = wishlist;

    //Optimistic UI update
    setWishlist((current) =>
      (current || []).filter((game) => game.id !== gameId)
    );

    try {
      //Remove from database backend
      await executeRemoveFromWishlist(gameId);
    } catch (error) {
      console.error("Failed to remove from wishlist, reverting UI", error);
      setWishlist(originalWishlist);
    }
  };

  const addToWishlist = async (gameData: GameCardData) => {
    //Same logic as removeGame
    const originalWishlist = wishlist;

    setWishlist((current) => [...(current || []), gameData]);

    try {
      await executeAddToWishlist(gameData.id);
    } catch (error) {
      console.error("Failed to add to wishlist, reverting UI", error);
      setWishlist(originalWishlist);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      setWishlist(null);
    }
  }, [isLoggedIn, fetchWishlist, setWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlist || [],
        isLoading,
        fetchWishlist,
        removeGameFromWishlist,
        addToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

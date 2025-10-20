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
    handleGetWishlist,
    isLoading,
    setData: setWishlist,
  } = useGetWishlist();
  const { handleRemoveFromWishlist } = useRemoveFromWishlist();
  const { handleAddToWishlist } = useAddToWishlist();

  const removeGameFromWishlist = async (gameId: number) => {
    // Storing the original state, because i will try optimistic UI technique
    const originalWishlist = wishlist;

    //Optimistic UI update
    setWishlist((current) =>
      (current || []).filter((game) => game.id !== gameId)
    );

    try {
      //Remove from database backend
      await handleRemoveFromWishlist(gameId);
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
      await handleAddToWishlist(gameData.id);
    } catch (error) {
      console.error("Failed to add to wishlist, reverting UI", error);
      setWishlist(originalWishlist);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleGetWishlist();
    } else {
      setWishlist(null);
    }
  }, [isLoggedIn, handleGetWishlist, setWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlist || [],
        isLoading,
        handleGetWishlist,
        removeGameFromWishlist,
        addToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

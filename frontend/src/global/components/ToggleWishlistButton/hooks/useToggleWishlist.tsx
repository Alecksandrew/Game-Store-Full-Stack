import { useContext } from "react";
import { WishlistContext } from "@/features/Wishlist/context/WishlistContext";
import type { GameCardData } from "../../GameCard";

export function useToggleWishlist(gameData: GameCardData) {

  const { wishlist, removeGameFromWishlist, addToWishlist,  isLoading } = useContext(WishlistContext);

  const isWishlisted = wishlist.some(game => game.id === gameData.id);
  
  const handleToggle = async () => {

    if (isWishlisted) {
      await removeGameFromWishlist(gameData.id); 
    } else {
      await addToWishlist(gameData); //Backend
    }
    
  };

  return { isWishlisted, handleToggle, isLoading };
}
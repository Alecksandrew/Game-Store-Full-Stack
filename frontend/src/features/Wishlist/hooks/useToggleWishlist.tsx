import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { useAddToWishlist, useRemoveFromWishlist } from "./useWishlist";

export function useToggleWishlist(gameId: number, initialIsWishlisted: boolean) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(initialIsWishlisted);
  const { execute: addToWishlist, isLoading: isAdding } = useAddToWishlist();
  const { execute: removeFromWishlist, isLoading: isRemoving } = useRemoveFromWishlist();
  const { refetchWishlist, removeGameFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    setIsWishlisted(initialIsWishlisted);
  }, [initialIsWishlisted]);

  const isDisabled = isAdding || isRemoving;

  const handleToggle = async () => {
    if (isDisabled) return;

    if (isWishlisted) {
      await removeFromWishlist(gameId);
      removeGameFromWishlist(gameId);
    } else {
      await addToWishlist(gameId);
      refetchWishlist();
    }
    
    setIsWishlisted(!isWishlisted);
    
  };

  return { isWishlisted, isDisabled, handleToggle };
}
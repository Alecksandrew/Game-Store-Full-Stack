import ToggleWishlist from "@/global/components/ToggleWishlist/ToggleWishlist";
import { useContext } from "react";
import { GameCardContext } from "../../../context/GameCardContext";
import { WishlistContext } from "@/features/Wishlist/context/WishlistContext";
import isUserLogged from "@/global/utils/isUserLogged";

export default function GameCardWishlist() {
  const gameData = useContext(GameCardContext);
  const { wishlist, isLoading } = useContext(WishlistContext);

  if (!isUserLogged() || (isLoading && wishlist.length === 0)) {
    return null;
  }

  const isWishlisted = wishlist.some(game => game.id == gameData.id);

  return (
    <ToggleWishlist
      type="icon"
      className="absolute right-2/100 top-2/100"
      gameId={gameData.id}
      initialIsWishlisted={isWishlisted}
    />
  );
}
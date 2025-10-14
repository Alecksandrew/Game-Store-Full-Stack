import { useContext } from "react";
import { WishlistContext } from "@/features/Wishlist/context/WishlistContext";
import isUserLogged from "@/global/utils/isUserLogged";
import { ToggleWishlist } from "@/global/components/ToggleWishlist";
import { GameCardContext } from "../../context/GameCardContext";

export function WishlistToggle() {
  const gameData = useContext(GameCardContext);

  if (!isUserLogged()) {
    return null;
  }

  return (
    <ToggleWishlist
      type="icon"
      className="absolute right-2/100 top-2/100"
      gameId={gameData.id}
    />
  );
}
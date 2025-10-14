import { useContext } from "react";
import isUserLogged from "@/global/utils/isUserLogged";
import { GameCardContext } from "../../context/GameCardContext";
import { ToggleWishlistButton } from "@/global/components/ToggleWishlistButton";

export function WishlistToggle() {
  const gameData = useContext(GameCardContext);

  if (!isUserLogged()) {
    return null;
  }

  return (
    <ToggleWishlistButton
      type="icon"
      className="absolute right-2/100 top-2/100"
      gameId={gameData.id}
    />
  );
}
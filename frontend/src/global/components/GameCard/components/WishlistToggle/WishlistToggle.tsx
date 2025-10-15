import { useContext } from "react";
import { GameCardContext } from "../../context/GameCardContext";
import { ToggleWishlistButton } from "@/global/components/ToggleWishlistButton";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";

export function WishlistToggle() {
  const gameData = useContext(GameCardContext);
  const {isLoggedIn} = useContext(MyAccountContext)

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ToggleWishlistButton
      type="icon"
      className="absolute right-2/100 top-2/100"
      gameData={gameData}
    />
  );
}
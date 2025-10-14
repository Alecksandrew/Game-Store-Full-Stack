import type { GameCardData } from "../GameCard";

export type ToggleWishlistButtonProps = {
    className?: string;
    gameData: GameCardData;
    type: "icon" | "text";
  };
  
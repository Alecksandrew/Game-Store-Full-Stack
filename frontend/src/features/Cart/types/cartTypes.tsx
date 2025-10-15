import type { GameCardData } from "@/global/components/GameCard/types";

export type CartContextType = {
  cartItems: GameCardData[];
  addToCart: (game: GameCardData) => void;
  removeFromCart: (gameId: number) => void;
  clearCart: () => void,
  total: number;
};
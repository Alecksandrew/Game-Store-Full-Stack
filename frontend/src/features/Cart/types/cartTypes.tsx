import type { GameCardData } from "@/features/Home/types/GameCardType";

export type CartContextType = {
  cartItems: GameCardData[];
  addToCart: (game: GameCardData) => void;
  removeFromCart: (gameId: number) => void;
  total: number;
};
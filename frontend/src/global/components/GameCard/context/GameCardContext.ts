import { createContext } from "react";
import type { GameCardData } from "../types";

//Context
const placeholderGameCardData = {
  id: 0,
  name: "Game not found",
  coverUrl: "https://placehold.co/600x400?text=No+Image",
  price: 0,
  discountPrice: 0,
};

export const GameCardContext = createContext<GameCardData>(placeholderGameCardData);
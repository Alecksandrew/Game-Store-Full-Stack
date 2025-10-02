import { createContext } from "react";
import type { CartContextType } from "../types/cartTypes";

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0,
});
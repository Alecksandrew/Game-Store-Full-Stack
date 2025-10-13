import { type ReactNode, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import type { GameCardData } from "@/global/components/GameCard/types";

export const CartProvider = ({ children }: { children: ReactNode }) => {
// Persist cart in local storage
  const [cartItems, setCartItems] = useState<GameCardData[]>(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (game: GameCardData) => {
    // Dont add the same game twice, but only change amount
    if (!cartItems.some(item => item.id === game.id)) {
      setCartItems(prevItems => [...prevItems, game]);
    }
  };

  const removeFromCart = (gameId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => {
    const price = (item.discountPrice != null && item.discountPrice > 0) ? item.discountPrice : item?.price ? item.price : 0;
    return (sum + price)
  }, 0);
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};



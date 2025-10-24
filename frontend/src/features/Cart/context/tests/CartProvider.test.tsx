import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useContext } from "react";
import type { GameCardData } from "@/global/components/GameCard/types";
import { CartProvider } from "../CartProvider";
import { CartContext } from "../CartContext";

const regularGame: GameCardData = {
  id: 1,
  name: "Standard Game",
  coverUrl: "url1",
  price: 50,
  discountPrice: 0,
};

const gameWithDiscount: GameCardData = {
  id: 2,
  name: "Game on sale",
  coverUrl: "url2",
  price: 100,
  discountPrice: 80,
};


let localStorageMock: Record<string, string> = {};
beforeEach(() => {
  localStorageMock = {};
  vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: any) => localStorageMock[key]
  );
  vi.spyOn(window.localStorage.__proto__, "setItem").mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: any, value: any) => {
      localStorageMock[key] = value;
    }
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});


describe("CartProvider", () => {
  const renderCart = () => {
    return renderHook(() => useContext(CartContext), {
      wrapper: CartProvider,
    });
  };

  it("It should start with empty cart if localStorage is empty", () => {
    const { result } = renderCart();

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it("It should load the initial state of localStorage", () => {
    localStorageMock["cartItems"] = JSON.stringify([regularGame]);

    const { result } = renderCart();

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].id).toBe(1);
    expect(result.current.total).toBe(50);
  });

  it("It should add a item to the cart and update the price of the sum of all of the games", () => {
    const { result } = renderCart();

    act(() => {
      result.current.addToCart(regularGame);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].name).toBe("Standard Game");
    expect(result.current.total).toBe(50);
    expect(localStorageMock["cartItems"]).toBe(JSON.stringify([regularGame]));
  });

  it("It should not add the same game twice", () => {
    const { result } = renderCart();

    act(() => {
      result.current.addToCart(regularGame);
    });
    
    act(() => {
      result.current.addToCart(regularGame);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.total).toBe(50);
  });

  it("It should remove a game from the cart", () => {
    const { result } = renderCart();

    act(() => {
      result.current.addToCart(regularGame);
    });

    act(() => {
      result.current.removeFromCart(1); // gameID
    });

    expect(result.current.cartItems.length).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it("It should clear the cart", () => {
    const { result } = renderCart();

    act(() => {
      result.current.addToCart(regularGame);
      result.current.addToCart(gameWithDiscount);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems.length).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it("It should calculate correctly the total with games with or without discount", () => {
    const { result } = renderCart();

    act(() => {
      result.current.addToCart(regularGame);
    });

    expect(result.current.total).toBe(50);

    act(() => {
      result.current.addToCart(gameWithDiscount); // total = 50 + 80 = 130
    });

    expect(result.current.total).toBe(130);

    act(() => {
      result.current.removeFromCart(2); //gameWithDiscount removed
    });

    expect(result.current.total).toBe(50);
  });
});
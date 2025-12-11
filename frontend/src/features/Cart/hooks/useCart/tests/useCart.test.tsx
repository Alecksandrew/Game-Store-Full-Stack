import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCart } from "../useCart";
import type { GameCardData } from "@/global/components/GameCard/types";

const mockGame1: GameCardData = {
  id: 1,
  name: "Game 1",
  price: 50,
  discountPrice: 0,
  description: "Desc 1",
  coverImage: "img1.jpg",
  platform: "PC",
  releaseDate: "2023-01-01",
  publisher: "Pub 1",
  developer: "Dev 1",
  genres: ["Action"],
  features: [],
  averageRating: 4.5,
  totalReviews: 10,
  stock: 10,
};

const mockGame2: GameCardData = {
  id: 2,
  name: "Game 2",
  price: 60,
  discountPrice: 30, // Discounted
  description: "Desc 2",
  coverImage: "img2.jpg",
  platform: "PS5",
  releaseDate: "2023-02-01",
  publisher: "Pub 2",
  developer: "Dev 2",
  genres: ["RPG"],
  features: [],
  averageRating: 4.8,
  totalReviews: 20,
  stock: 5,
};

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should initialize with empty cart if localStorage is empty", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it("should initialize with items from localStorage", () => {
    localStorage.setItem("cartItems", JSON.stringify([mockGame1]));
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(mockGame1.id);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockGame1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual(mockGame1);
    expect(localStorage.getItem("cartItems")).toContain("Game 1");
  });

  it("should not add duplicate items", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockGame1);
    });
    act(() => {
      result.current.addToCart(mockGame1);
    });

    expect(result.current.cartItems).toHaveLength(1);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockGame1);
      result.current.addToCart(mockGame2);
    });

    expect(result.current.cartItems).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(mockGame1.id);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(mockGame2.id);
  });

  it("should clear cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockGame1);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it("should calculate total correctly considering discounts", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockGame1); // Price 50
      result.current.addToCart(mockGame2); // Discount Price 30
    });

    // 50 + 30 = 80
    expect(result.current.total).toBe(80);
  });
});

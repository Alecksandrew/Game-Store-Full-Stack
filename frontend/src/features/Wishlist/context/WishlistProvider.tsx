import isUserLogged from "@/global/utils/isUserLogged";
import { useGetWishlist } from "../hooks/useWishlist";
import { useEffect, useState, type ReactNode } from "react";
import { WishlistContext } from "./WishlistContext";
import type { GameCardData } from "@/features/Home/types/GameCardType";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { data, execute, isLoading } = useGetWishlist();
  const [wishlist, setWishlist] = useState<GameCardData[]>([]);

  const refetchWishlist = () => {
      if (isUserLogged()) {
          execute();
      }
  }

  const removeGameFromWishlist = (gameId: number) => {
      setWishlist((currentWishlist) =>
        currentWishlist.filter((game) => game.id !== gameId)
      );
    };


  useEffect(() => {
    if (isUserLogged()) {
      execute();
    }
  }, [execute]);

  useEffect(() => {
    if (data) {
        setWishlist(data);
    }
  }, [data]);

  return (
    <WishlistContext.Provider value={{ wishlist, isLoading, refetchWishlist, removeGameFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
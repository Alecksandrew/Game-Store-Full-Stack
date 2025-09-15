import isUserLogged from "@/global/utils/isUserLogged";
import { useGetWishlist } from "../hooks/useWishlist";
import { useEffect, useState, type ReactNode } from "react";
import { WishlistContext } from "./WishlistContext";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { data, execute, isLoading } = useGetWishlist();
  const [wishlist, setWishlist] = useState<number[]>([]);

  const refetchWishlist = () => {
      if (isUserLogged()) {
          execute();
      }
  }

  useEffect(() => {
    if (isUserLogged()) {
      execute();
    }
  }, [execute]);

  useEffect(() => {
    if (data) {
        console.log(data);
        const wishlistedGameIds = data.map(item => item.id);
        setWishlist(wishlistedGameIds);
    }
  }, [data]);

  return (
    <WishlistContext.Provider value={{ wishlist, isLoading, refetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
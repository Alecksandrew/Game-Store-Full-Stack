import { useContext } from "react";
import Button from "./Button";
import ToggleWishlist from "./ToggleWishlist/ToggleWishlist";
import { GameCardContext } from "@/features/Home/context/GameCardContext";
import { WishlistContext } from "@/features/Wishlist/context/WishlistContext";
import { GameDetailsDataContext } from "@/features/Details/contexts/GameDetailsDataContext";

export default function BuyAndWishlistBtns() {
   const gameData = useContext(GameDetailsDataContext);
    const { wishlist} = useContext(WishlistContext);
   const isWishlisted = wishlist.some(game => game.id == gameData.id);

  return (
    <div className={`flex gap-2`}>
      <span className="w-5/10 sm:w-6/10">
        <Button
          type="button"
          title="Add to cart"
          className={`bg-primary text-text-primary`}
        />
      </span>
      <span className="w-5/10 sm:w-4/10">
        <ToggleWishlist
          type="text"
          gameId={gameData.id}
          initialIsWishlisted={isWishlisted}
          
         
        />
      </span>
    </div>
  );
}

import { useContext } from "react";
import Button from "./Button/Button";
import ToggleWishlist from "./ToggleWishlist/ToggleWishlist";
import { WishlistContext } from "@/features/Wishlist/context/WishlistContext";
import { GameDetailsDataContext } from "@/features/Details/contexts/GameDetailsDataContext";
import { CartContext } from "@/features/Cart/context/CartContext";

export default function BuyAndWishlistBtns() {
  const gameData = useContext(GameDetailsDataContext);
  const { wishlist } = useContext(WishlistContext);
  const isWishlisted = wishlist.some((game) => game.id == gameData.id);
  const { addToCart } = useContext(CartContext);

  return (
    <div className={`flex gap-2`}>
      <span className="w-5/10 sm:w-6/10">
        <Button
          type="button"
          title="Add to cart"
          className={`bg-primary text-text-primary`}
          onClick={() => addToCart(gameData)}
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

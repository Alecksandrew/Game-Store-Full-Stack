import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import type { ToggleWishlistProps } from "./types";
import { useToggleWishlist } from "./hooks/useToggleWishlist";
import { Button } from "../Button";
import { WishlistContext } from "@/features/Wishlist/context/WishlistContext";
import { useContext } from "react";

export function ToggleWishlist({
  className,
  gameId,
  type,
}: ToggleWishlistProps) {
  const { wishlist } = useContext(WishlistContext);
  const isCurrentlyWishlisted = wishlist.some((game) => game.id === gameId);

  const { isWishlisted, isDisabled, handleToggle } = useToggleWishlist(
    gameId,
    isCurrentlyWishlisted
  );

  if (type === ("icon" as const)) {
    return (
      <button
        disabled={isDisabled}
        onClick={handleToggle}
        className={`p-1 rounded bg-text-primary aspect-square flex justify-center items-center text-2xl ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        {isWishlisted ? (
          <MdOutlineFavorite className="fill-primary" />
        ) : (
          <MdOutlineFavoriteBorder className="fill-primary" />
        )}
      </button>
    );
  }

  if (type === ("text" as const)) {
    return (
      <Button
        type="button"
        className={`ring-2 ring-primary ${
          isWishlisted
            ? "bg-primary text-text-primary"
            : "bg-transparent text-primary hover:bg-primary hover:text-text-primary"
        }`}
        disabled={isDisabled}
        onClick={handleToggle}
      >
        {isWishlisted ? "Remove Wishlist" : "Add to Wishlist"}
      </Button>
    );
  }
}

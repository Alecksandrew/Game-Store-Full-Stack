import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import type { ToggleWishlistButtonProps } from "./types";
import { useToggleWishlist } from "./hooks/useToggleWishlist";
import { Button } from "../Button";
export function ToggleWishlistButton({
  className,
  gameData,
  type,
}: ToggleWishlistButtonProps) {
  const { isWishlisted, isLoading, handleToggle } = useToggleWishlist(gameData);

  if (type === ("icon" as const)) {
    return (
      <button
        disabled={isLoading}
        onClick={handleToggle}
        className={`p-1 rounded bg-text-primary aspect-square flex justify-center items-center text-2xl ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
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
        disabled={isLoading}
        onClick={handleToggle}
      >
        {isWishlisted ? "Remove Wishlist" : "Add to Wishlist"}
      </Button>
    );
  }
}

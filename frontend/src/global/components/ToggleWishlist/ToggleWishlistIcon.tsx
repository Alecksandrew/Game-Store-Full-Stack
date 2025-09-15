import type { ToggleWishlistProps } from "./ToggleWishlist";
import { useToggleWishlist } from "@/features/Wishlist/hooks/useToggleWishlist";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";



export default function ToggleWishlistIcon({
  className,
  gameId,
  initialIsWishlisted,
}: ToggleWishlistProps) {
   const { isWishlisted, isDisabled, handleToggle } = useToggleWishlist(gameId, initialIsWishlisted);

  return (
    <button
      disabled={isDisabled}
      onClick={handleToggle}
      className={`p-1 rounded bg-text-primary aspect-square flex justify-center items-center text-2xl ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isWishlisted ? (
        <MdOutlineFavorite className="fill-primary" />
      ) : (
        <MdOutlineFavoriteBorder className="fill-primary" />
      )}
    </button>
  );
}
import { useToggleWishlist } from "@/features/Wishlist/hooks/useToggleWishlist";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Button from "../Button";

export type ToggleWishlistProps = {
  className?: string;
  gameId: number;
  initialIsWishlisted: boolean;
  type: "icon" | "text";
};

export default function ToggleWishlist({
  className,
  gameId,
  initialIsWishlisted,
  type,
}: ToggleWishlistProps) {
  const { isWishlisted, isDisabled, handleToggle } = useToggleWishlist(
    gameId,
    initialIsWishlisted
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
      title={isWishlisted ? "Remove Wishlist" : "Add to Wishlist"}
      className={`ring-2 ring-primary text-primary hover:bg-primary hover:text-text-primary ${isWishlisted ? "bg-primary text-text-primary" : ""}  ${className}`}
      disabled={isDisabled}
      onClick={handleToggle}
    />
  );
  }
}

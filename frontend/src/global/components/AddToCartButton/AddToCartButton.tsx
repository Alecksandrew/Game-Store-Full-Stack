import { useContext } from "react";
import { CartContext } from "@/features/Cart/context/CartContext";
import { Button } from "@/global/components/Button";

export function AddToCartButton({ gameData, className }: AddToCartButtonProps) {
  const { addToCart } = useContext(CartContext);

  return (
    <Button
      type="button"
      className={className}
      onClick={() => addToCart(gameData)}
    >
      Add to cart
    </Button>
  );
}

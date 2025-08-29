import { useContext } from "react";
import type { PriceContainerProps } from "../types/PriceContainerType";
import { GameDetailsDataContext } from "@/features/Details/contexts/GameDetailsDataContext";

export default function PriceContainer({ className }: PriceContainerProps) {
  const data = useContext(GameDetailsDataContext);

  function displayPrice() {
    if (data.discountPrice != null) {
      return (
        <>
          <span>${data.discountPrice}</span>
          <span className="text-text-secondary line-through text-lg font-light">
            ${data.price}
          </span>
        </>
      );
    } else {
      return <span>${data.price}</span>;
    }
  }

  return (
    <div
      className={`text-primary font-bold text-3xl flex items-center gap-2 ${className}`}
    >
      {displayPrice()}
    </div>
  );
}

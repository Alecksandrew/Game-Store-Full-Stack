import PriceContainer from "@/global/components/PriceContainer";
import Platforms from "./Platforms";
import type { GamePurchasePanelProps } from "../types/GamePurchasePanel";
import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import PurchaseBenefitsCard from "@/features/Details/components/PurchaseBenefitsCard.tsx";
import { AddToCartButton } from "@/global/components/AddToCartButton";
import { ToggleWishlist } from "@/global/components/ToggleWishlist";

export default function GamePurchasePanel({
  className,
}: GamePurchasePanelProps) {
  const { gameDetails } = useContext(GameDetailsDataContext);
  const { name, price, discountPrice, id } = gameDetails;

  return (
    <div className={`bg-bg-primary ${className}`}>
      <h1 className="text-4xl font-bold text-primary mt-2">{name}</h1>
      <Platforms heading="h3" className="mt-3" />
      <PriceContainer
        className="mt-8"
        price={price}
        discountPrice={discountPrice}
      />
      <div className="flex gap-2">
        <span className="w-5/10 sm:w-6/10">
          <AddToCartButton
            gameData={gameDetails}
            className="bg-primary text-text-primary"
          />
        </span>
        <span className="w-5/10 sm:w-4/10">
          <ToggleWishlist type="text" gameId={id} />
        </span>
      </div>
      <PurchaseBenefitsCard heading={"h1"} className="mt-4" />
    </div>
  );
}

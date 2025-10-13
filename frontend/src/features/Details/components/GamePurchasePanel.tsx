import PriceContainer from "@/global/components/PriceContainer";
import Platforms from "./Platforms";
import type { GamePurchasePanelProps } from "../types/GamePurchasePanel";
import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import BuyAndWishlistBtns from "@/global/components/BuyAndWishlistBtns";
import PurchaseBenefitsCard from "@/features/Details/components/PurchaseBenefitsCard.tsx";

export default function GamePurchasePanel({
  className,
}: GamePurchasePanelProps) {
  const {gameDetails} = useContext(GameDetailsDataContext);

  return (
    <div className={`bg-bg-primary ${className}`}>
      <h1 className="text-4xl font-bold text-primary mt-2">{gameDetails.name}</h1>
      <Platforms heading="h3" className="mt-3" />
       <PriceContainer 
        className="mt-8"
        price={gameDetails.price}
        discountPrice={gameDetails.discountPrice}
      />
      <BuyAndWishlistBtns/>
      <PurchaseBenefitsCard heading={"h1"} className="mt-4"/>
    </div>
  );
}

import PriceContainer from "@/global/components/PriceContainer";
import Platforms from "./Platforms";
import type { GamePurchasePanelProps } from "../types/GamePurchasePanel";
import { useContext } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";

export default function GamePurchasePanel({
  className,
}: GamePurchasePanelProps) {
  const data = useContext(GameDetailsDataContext);

  return (
    <div className={className}>
      <h1 className="text-2xl">{data.name}</h1>
      <Platforms heading="h3" className="mt-4" />
      <PriceContainer />
    </div>
  );
}

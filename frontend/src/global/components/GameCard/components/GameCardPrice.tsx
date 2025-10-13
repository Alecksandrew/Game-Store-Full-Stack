// CÓDIGO MODIFICADO
import { useContext } from "react";
import PriceContainer from "@/global/components/PriceContainer";
import { GameCardContext } from "../../../../features/Home/context/GameCardContext";

export default function GameCardPrice() {
 
  const gameData = useContext(GameCardContext);

  return (
    <PriceContainer 
      price={gameData.price} 
      discountPrice={gameData.discountPrice} 
    />
  );
}
import { useContext } from "react";
import PriceContainer from "@/global/components/PriceContainer";
import { GameCardContext } from "../../context/GameCardContext";


export function Price() {
 
  const gameData = useContext(GameCardContext);

  return (
    <PriceContainer 
      price={gameData.price} 
      discountPrice={gameData.discountPrice} 
    />
  );
}
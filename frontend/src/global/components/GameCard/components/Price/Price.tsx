import { useContext } from "react";
import { DisplayPrice } from "@/global/components/DisplayPrice"
import { GameCardContext } from "../../context/GameCardContext";


export function Price() {
 
  const gameData = useContext(GameCardContext);

  return (
    <DisplayPrice
      price={gameData.price} 
      discountPrice={gameData.discountPrice} 
    />
  );
}
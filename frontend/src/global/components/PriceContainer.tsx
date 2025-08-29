import type { PriceContainerProps } from "../types/PriceContainerType";



export default function PriceContainer({gameData, className}:PriceContainerProps){
 function displayPrice() {
    if (gameData.discountPrice != null) {
      return (
        <>
          <span>${gameData.discountPrice}</span>
          <span className="text-text-secondary line-through text-lg font-light">${gameData.price}</span>
        </>
      );
    } else {
      return <span>${gameData.price}</span>;
    }
  }

    return (
         <div className={`text-primary font-bold text-3xl flex items-center gap-2 ${className}`}>{displayPrice()}</div>
    )
}
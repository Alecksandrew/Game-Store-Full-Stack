import type { DisplayPriceProps } from "./types";


export function DisplayPrice({ className, price, discountPrice }: DisplayPriceProps) {

  function displayPrice() {
    if (discountPrice != null && discountPrice > 0) {
      return (
        <>
          <span>${discountPrice.toFixed(2)}</span>
          <span className="text-text-secondary line-through font-light itaic text-lg">
            ${price?.toFixed(2)}
          </span>
        </>
      );
    } else {
      return <span>${price?.toFixed(2)}</span>;
    }
  }

  return (
    <div
      className={`text-primary mt-1 font-semibold font-inter text-2xl flex items-center gap-2 ${className}`}
    >
      {displayPrice()}
    </div>
  );
}
import Button from "@/global/components/Button";
import ToggleWishlist from "@/global/components/ToggleWishlist";
import { type GameCardProps } from "../types/GameCardType";
import PriceContainer from "@/global/components/PriceContainer";

export default function GameCard({ gameData, className }: GameCardProps) {
  return (
    <div
      className={`relative bg-bg-secondary aspect-4/5 w-full min-h-[500px] rounded-xl overflow-hidden flex flex-col outline-1 outline-primary ${className}`}
    >
      <ToggleWishlist className="absolute right-2/100 top-2/100" />
      <div className="w-full h-65/100 bg-amber-300">
        <img
          src={gameData.coverUrl}
          alt={`Image of the game ${gameData.name}`}
          className="w-full h-full"
        />
      </div>
      <div className=" flex flex-col justify-between p-3 flex-1">
        <div className="">
          <h2 className="text-white text-3xl mb-auto line-clamp-2">
            {gameData.name}
          </h2>
          <PriceContainer gameData={gameData} />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            title="View details"
            className="bg-text-primary text-primary"
          />
          <Button type="button" title="Add to cart" />
        </div>
      </div>
    </div>
  );
}

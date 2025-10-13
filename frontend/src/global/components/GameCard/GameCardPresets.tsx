import Button from "@/global/components/Button/Button";
import { type GameCardProps } from "./types";
import { GameCard } from "./GameCard";
import { useNavigate } from "react-router";
import { CartContext } from "@/features/Cart/context/CartContext";
import { useContext } from "react";
import { Skeleton } from "@/global/components/Skeleton/Skeleton";

export function GameCardWithPrice({ gameData, className }: GameCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  return (
    <GameCard.Root gameCardData={gameData} className={className}>
      <GameCard.Wishlist />
      <GameCard.Image />
      <GameCard.Body>
        <div>
          <GameCard.Title />
          <GameCard.Price />
        </div>
        <GameCard.Actions>
          <Button
            type="button"
            title="View details"
            className="bg-text-primary text-primary"
            onClick={() => navigate(`/games/${gameData.id}`)}
          />
          <Button
            type="button"
            title="Add to cart"
            onClick={() => addToCart(gameData)}
          />
        </GameCard.Actions>
      </GameCard.Body>
    </GameCard.Root>
  );
}

export function GameCardNoPrice({ gameData, className }: GameCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  return (
    <GameCard.Root gameCardData={gameData} className={className}>
      <GameCard.Wishlist />
      <GameCard.Image />
      <GameCard.Body>
        <GameCard.Title />
        <GameCard.Actions>
          <Button
            type="button"
            title="View details"
            className="bg-text-primary text-primary"
            onClick={() => navigate(`/games/${gameData.id}`)}
          />
          <Button
            type="button"
            title="Add to cart"
            onClick={() => addToCart(gameData)}
          />
        </GameCard.Actions>
      </GameCard.Body>
    </GameCard.Root>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="relative bg-bg-primary w-full rounded-xl overflow-hidden flex flex-col outline-1 outline-primary">
      <Skeleton className="w-full aspect-[3/4]" />
      <div className="flex flex-col justify-between p-3 flex-1">
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-full mb-auto" />

        <div className="flex gap-2 mt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

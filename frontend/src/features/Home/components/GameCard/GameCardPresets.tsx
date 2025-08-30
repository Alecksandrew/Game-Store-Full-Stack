import Button from "@/global/components/Button";
import { type GameCardProps } from "../../types/GameCardType";
import { GameCard } from "./GameCard";

export function GameCardWithPrice({ gameData, className }: GameCardProps) {
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
          />
          <Button type="button" title="Add to cart" />
        </GameCard.Actions>
      </GameCard.Body>
    </GameCard.Root>
  );
}

export function GameCardNoPrice({ gameData, className }: GameCardProps) {
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
          />
          <Button type="button" title="Add to cart" />
        </GameCard.Actions>
      </GameCard.Body>
    </GameCard.Root>
  );
}

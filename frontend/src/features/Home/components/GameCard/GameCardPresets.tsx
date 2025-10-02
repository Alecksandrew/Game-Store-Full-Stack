import Button from "@/global/components/Button";
import { type GameCardProps } from "../../types/GameCardType";
import { GameCard } from "./GameCard";
import { useNavigate } from "react-router";
import { CartContext } from "@/features/Cart/context/CartContext";
import { useContext } from "react";

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

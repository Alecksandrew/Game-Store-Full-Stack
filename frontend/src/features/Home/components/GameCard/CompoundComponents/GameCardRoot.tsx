import { twMerge } from "tailwind-merge";
import type { GameCardData } from "../../../types/GameCardType";
import { GameCardContext } from "../../../context/GameCardContext";



interface GameCardRootProps {
  children: React.ReactNode;
  className?: string;
  gameCardData: GameCardData;
}
export default function GameCardRoot({
  gameCardData,
  children,
  className,
}: GameCardRootProps) {
  return (
    <GameCardContext.Provider value={gameCardData}>
      <div
        className={twMerge(
          `relative bg-bg-secondary w-full rounded-xl overflow-hidden flex flex-col outline-1 outline-primary ${className}`
        )}
      >
        {children}
      </div>
    </GameCardContext.Provider>
  );
}

import { twMerge } from "tailwind-merge";
import type { RootProps } from "./types";
import { GameCardContext } from "../../context/GameCardContext";



export function Root({
  gameCardData,
  children,
  className,
}: RootProps) {
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

import type { GameCardData } from "../../types";

export interface RootProps {
    children: React.ReactNode;
    className?: string;
    gameCardData: GameCardData;
  }
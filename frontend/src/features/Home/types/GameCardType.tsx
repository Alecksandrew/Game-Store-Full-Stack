export type GameCardData = {
    id: number;
    name: string;
    coverUrl: string;
    price?: number;
    discountPrice?: number | null;
}

export type GameCardProps = {
  className?: string;
  gameData: GameCardData
  showPrice?: boolean
}


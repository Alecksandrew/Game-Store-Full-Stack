export type GamePurchasePanelData = {
    name: string;
    price: number;
    discountPrice?: number | null;
    platforms: string[]
}

export type GamePurchasePanelProps = {
  className?: string;
  gameData: GamePurchasePanelData
}


export type GamePurchasePanelData = {
    name: string;
    price: number;
    discountPrice?: number | null;
}

export type GamePurchasePanelProps = {
  className?: string;
  gameData: GamePurchasePanelData
}


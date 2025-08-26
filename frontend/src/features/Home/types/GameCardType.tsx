export type GameCardProps = {
  gameData: {
    id: number;
    name: string;
    coverUrl: string;
    price: number;
    discountPrice?: number | null;
  };
  className?: string;
};

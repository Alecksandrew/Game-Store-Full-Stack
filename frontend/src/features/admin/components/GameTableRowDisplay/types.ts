import type { gameTableRowProps } from "../../types/gameTableRowType";

export type GameTableRowDisplayProps = {
  gameInfo: gameTableRowProps;
  onEdit: (id: number) => void;
  onOpenKeysModal?: (gameId: number, gameName: string) => void;
};

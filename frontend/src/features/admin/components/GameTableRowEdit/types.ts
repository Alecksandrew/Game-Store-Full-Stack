import type { AdminGame } from "../../types/gameDashboardTypes";

export type GameTableRowEditProps = {
  gameInfo: AdminGame;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
};

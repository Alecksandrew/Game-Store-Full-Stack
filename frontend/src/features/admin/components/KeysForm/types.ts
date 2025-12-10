import type { ReactNode } from "react";

export type KeysFormProps = {
  gameName: string;
  isLoading?: boolean;
  warningComponent?: ReactNode;
  onSubmit: (keys: string[]) => Promise<void> | void;
  onCancel: () => void;
};

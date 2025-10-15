import type { ReactNode } from "react";

export type RootProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
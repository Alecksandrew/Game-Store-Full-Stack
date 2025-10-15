import type { ReactNode } from "react";

export type TdProps = {
  children: ReactNode;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

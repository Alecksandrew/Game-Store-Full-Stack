import type { ReactNode } from "react";

export type ThProps = {
  children: ReactNode;
} & React.ThHTMLAttributes<HTMLTableCellElement>;

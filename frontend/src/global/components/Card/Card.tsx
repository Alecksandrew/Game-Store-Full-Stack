import { twMerge } from "tailwind-merge";
import type { CardProps } from "./types";

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge( 
        "rounded border-2 border-primary bg-bg-secondary",
        className 
      )}
    >
      {children}
    </div>
  );
}
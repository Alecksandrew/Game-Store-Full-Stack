import { twMerge } from "tailwind-merge";
import type { ContentProps } from "./types";

export function Content({ children, className }: ContentProps) {
  return <div className={twMerge("p-6 w-full", className)}>{children}</div>;
}
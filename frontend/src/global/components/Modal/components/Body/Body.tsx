import { twMerge } from "tailwind-merge";
import type { BodyProps } from "./types";

// Componente Body
export function Body({ children, className }: BodyProps) {
  return <div className={twMerge("font-inter font-light text-sm md:text-lg xl:text-xl", className)}>{children}</div>;
}
import { twMerge } from "tailwind-merge";
import type { HeaderProps } from "./types";


export function Header({ title, className }: HeaderProps) {
  return (
    <h2 className={twMerge("font-orbitron font-bold text-2xl md:text-3xl mb-2", className)}>
      {title}
    </h2>
  );
}
import { twMerge } from "tailwind-merge";
import type { FooterProps } from "./types";


export function Footer({ children, className }: FooterProps) {
  return <div className={twMerge("flex gap-4 w-full mt-4", className)}>{children}</div>;
}
import { twMerge } from "tailwind-merge";
import type { ActionsProps } from "./types";

export function Actions({
  children,
  className,
}: ActionsProps) {
  return (
    <div className={twMerge("flex gap-2 mt-4", className)}>{children}</div>
  );
}

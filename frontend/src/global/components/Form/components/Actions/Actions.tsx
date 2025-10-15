
import { twMerge } from "tailwind-merge";
import type { ActionsProps } from "./types";


export function Actions({
  children,
  className,
  ...props
}: ActionsProps) {
  
  return (
    <div className={twMerge(
      "flex gap-3 mt-6",
      className
    )}
    {...props}>
      {children}
    </div>
  );
}
import { twMerge } from "tailwind-merge";
import type { BodyProps } from "./types";


export function Body({
  children,
  className,
  ...props
}: BodyProps) {

  return (
    <div className={twMerge("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}
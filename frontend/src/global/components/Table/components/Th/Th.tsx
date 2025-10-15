import { twMerge } from "tailwind-merge";
import type { ThProps } from "./types";


export  function Th({
  children,
  className,
  ...props
}: ThProps) {
  return <th className={twMerge("pr-12 py-3 text-left", className)} {...props}>{children}</th>
}

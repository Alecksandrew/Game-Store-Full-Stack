import { twMerge } from "tailwind-merge";
import type { TdProps } from "./types";


export  function Td({
  children,
  className,
  ...props
}: TdProps) {
  return <td className={twMerge("pr-12 py-4 text-left font-light" , className)} {...props}>{children}</td>
}

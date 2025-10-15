import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./types";

export function Button({
  className,
  children,
  type,
  ...props
}: ButtonProps) {

  return (
    <button type={type} className={twMerge(`font-semibold p-0.5 sm:p-1 rounded w-full mt-2 bg-primary text-text-primary`, className)} {...props}>
      {children}
    </button>
  );
}

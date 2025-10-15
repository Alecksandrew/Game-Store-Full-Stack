import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";


export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("bg-text-secondary animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
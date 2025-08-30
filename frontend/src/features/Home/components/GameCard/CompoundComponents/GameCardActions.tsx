import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface GameCardActionsProps {
  children: ReactNode;
  className?: string;
}

export default function GameCardActions({
  children,
  className,
}: GameCardActionsProps) {
  return (
    <div className={twMerge("flex gap-2 mt-4", className)}>{children}</div>
  );
}

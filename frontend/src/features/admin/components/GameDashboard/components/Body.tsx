import type { ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export function Body({ children }: BodyProps) {
  return <div className="mb-4">{children}</div>;
}

import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <div className="mb-6">{children}</div>;
}

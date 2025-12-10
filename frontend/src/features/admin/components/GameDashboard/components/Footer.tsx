import type { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <div className="mt-4 flex justify-center rounded w-fit p-2 mx-auto">
      {children}
    </div>
  );
}

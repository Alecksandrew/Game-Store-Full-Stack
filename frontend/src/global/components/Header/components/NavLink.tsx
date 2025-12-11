import { Link } from "react-router";
import type { ReactNode } from "react";

type NavLinkProps = {
  to: string;
  children: ReactNode;
};

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="relative group text-text-primary font-medium px-2 py-1"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

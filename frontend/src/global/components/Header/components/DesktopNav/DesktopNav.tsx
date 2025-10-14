import { AuthButton } from "@/global/components/AuthButton";
import { navLinks } from "@/global/constants/navigation";
import { Link } from "react-router";

export function DesktopNav() {
  const linkClass =
    "hover:bg-bg-secondary hover:text-text-primary text-center rounded flex items-center justify-center p-1.5";

  return (
    <nav className="text-text-primary flex justify-center items-center gap-5 relative max-w-[600px] mx-auto">
      {navLinks.map((link) => (
        <Link key={link.title} className={linkClass} to={link.to}>
          {link.title}
        </Link>
      ))}
      <AuthButton />
    </nav>
  );
}

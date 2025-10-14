import { useState } from "react";

import { IoMenu } from "react-icons/io5";
import { navLinks } from "@/global/constants/navigation";
import { Link } from "react-router";
import { AuthButton } from "@/global/components/AuthButton";

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkClass =
    "hover:bg-bg-secondary hover:text-text-primary w-full text-center rounded flex items-center justify-center p-1.5";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex justify-end p-1">
        <IoMenu
          className="text-5xl text-text-primary cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {isMenuOpen && (
        <nav className="absolute z-20 flex flex-col items-center w-full top-full bg-primary border-b-4 border-primary p-2 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              className={linkClass}
              to={link.to}
              onClick={handleLinkClick}
            >
              {link.title}
            </Link>
          ))}
          <AuthButton />
        </nav>
      )}
    </>
  );
}

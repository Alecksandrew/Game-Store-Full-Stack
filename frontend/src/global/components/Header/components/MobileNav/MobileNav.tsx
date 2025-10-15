import { useContext, useState } from "react";

import { IoMenu } from "react-icons/io5";
import { navLinks } from "@/global/constants/navigation";
import { Link } from "react-router";
import { AuthButton } from "@/global/components/AuthButton";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkClass =
    "hover:bg-bg-secondary hover:text-text-primary w-full text-center rounded flex items-center justify-center p-1.5";
const {myAccountData, isLoggedIn} = useContext(MyAccountContext);
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  
 const filteredLinks = navLinks.filter(link => {
   
    if (!link.authRequired) {
      return true;
    }
    
    if (!isLoggedIn) {
      return false;
    }
  
    if (link.allowedRoles && !link.allowedRoles.includes(myAccountData?.role ?? '')) {
      return false;
    }
    
    return true;
  });    

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
          {filteredLinks.map((link) => (
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

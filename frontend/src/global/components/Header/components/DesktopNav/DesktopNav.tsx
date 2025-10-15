import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import { AuthButton } from "@/global/components/AuthButton";
import { navLinks } from "@/global/constants/navigation";
import { useContext } from "react";
import { Link } from "react-router";

export function DesktopNav() {
  const linkClass =
    "hover:bg-bg-secondary hover:text-text-primary text-center rounded flex items-center justify-center p-1.5";
  const {myAccountData, isLoggedIn} = useContext(MyAccountContext);

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
    <nav className="text-text-primary flex justify-center items-stretch gap-5 relative max-w-[600px] mx-auto h-full">
      {filteredLinks.map((link) => (
        <Link key={link.title} className={`${linkClass}`} to={link.to}>
          {link.title}
        </Link>
      ))}
      <AuthButton />
    </nav>
  );
}

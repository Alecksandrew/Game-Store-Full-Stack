import useMediaQuery from "@mui/material/useMediaQuery";
import { DesktopNav } from "./components/DesktopNav";
import { MobileNav } from "./components/MobileNav";



export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <header className="sticky top-0 z-20 max-w-screen bg-primary border-b-2 border-text-primary">
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </header>
  );
}

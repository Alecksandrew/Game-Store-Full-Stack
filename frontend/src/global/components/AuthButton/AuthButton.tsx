import { useLogout } from "@/features/auth/hooks/useAuth";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import type { AuthButtonProps } from "./types";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";
import { useContext } from "react";

export function AuthButton({ linkClass, buttonClass }:AuthButtonProps) {
  const { execute: executeLogout } = useLogout();
  const { isLoggedIn } = useContext(MyAccountContext)
  const btnClass = " text-center rounded flex items-center justify-center p-1.5"
  
  if (isLoggedIn) {
    return (
      <button onClick={() => executeLogout()} className={twMerge(` bg-danger ${btnClass}`, buttonClass )}>
        Logout
      </button>
    );
  }

  return (
    <Link className={`hover:bg-bg-secondary hover:text-text-primary ${btnClass}`} to={PAGE_ROUTES.AUTH.LOGIN}>
      <button className={buttonClass}>Login</button>
    </Link>
  );
}
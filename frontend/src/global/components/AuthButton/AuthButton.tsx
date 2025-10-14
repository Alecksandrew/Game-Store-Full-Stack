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
  
  if (isLoggedIn) {
    return (
      <button onClick={() => executeLogout()} className={twMerge(` bg-danger`, buttonClass)}>
        Logout
      </button>
    );
  }

  return (
    <Link className={linkClass} to={PAGE_ROUTES.AUTH.LOGIN}>
      <button className={buttonClass}>Login</button>
    </Link>
  );
}
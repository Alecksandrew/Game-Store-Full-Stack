import { useContext, type ReactNode } from "react";

import { Navigate } from "react-router";
import { PAGE_ROUTES } from "../constants/FRONTEND_URL";
import { MyAccountContext } from "@/features/myAccount/context/MyAccountContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {isLoggedIn} = useContext(MyAccountContext);

  if (!isLoggedIn) {
    return <Navigate to={PAGE_ROUTES.AUTH.LOGIN} replace />;
  }
  return (<>{children}</>);
};
import type { ReactNode } from "react";
import isUserLogged from "../utils/isUserLogged";
import { Navigate } from "react-router";
import { PAGE_ROUTES } from "../constants/FRONTEND_URL";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isUserLogged()) {
    return <Navigate to={PAGE_ROUTES.AUTH.LOGIN} replace />;
  }
  return (<>{children}</>);
};
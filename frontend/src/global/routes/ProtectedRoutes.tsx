import type { ReactNode } from "react";
import isUserLogged from "../utils/isUserLogged";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isUserLogged()) {
    return <Navigate to="/" replace />;
  }
  return (<>{children}</>);
};
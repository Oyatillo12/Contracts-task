import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectRouteProps {
  children: ReactNode;
}

export const ProtectLayout = ({ children }: ProtectRouteProps) => {
  const isAuth = !!localStorage.getItem("access_token");
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export const ProtectAuth = ({ children }: ProtectRouteProps) => {
  const isAuth = !!localStorage.getItem("access_token");
  if (isAuth) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

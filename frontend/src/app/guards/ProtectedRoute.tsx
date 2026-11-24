import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../store";
import { APP_ROUTES } from "../routes";

export const ProtectedRoute = () => {
  const accessToken = useAppStore((state) => state.auth.accessToken);


  if (!accessToken) {
    return <Navigate to={APP_ROUTES.AUTH.LOGIN} />;
  }

  return <Outlet />;
}


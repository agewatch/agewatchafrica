import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getStoredUser, isAuthenticated } from "../services/auth.js";

export default function AdminRoute() {
  const location = useLocation();
  const user = getStoredUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

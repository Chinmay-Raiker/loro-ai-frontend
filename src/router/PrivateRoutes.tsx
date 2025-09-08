// import { useLocalStore } from "@/store/data";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  //   const isAuthenticated = useLocalStore((s) => s.isAuthenticated);
  const isAuthenticated = true; // Placeholder for actual authentication logic
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

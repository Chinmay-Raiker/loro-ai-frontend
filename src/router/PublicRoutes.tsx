// import { useLocalStore } from "@/store/data";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  //   const isAuthenticated = useLocalStore((s) => s.isAuthenticated);
  const isAuthenticated = true; // Placeholder for actual authentication logic
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

// router.tsx
import AppLayout from "@/layout/AppLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";

// pages
import Agent from "@/pages/Agent/Agent";
import Dashboard from "@/pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  // Public-only routes
  {
    element: <PublicRoute />,
    // children: [{ path: "/login", element: <Login /> }],
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />, // shared UI (sidebar/topbar)
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/agents", element: <Agent /> },
          //   { path: "/users", element: <User /> },
        ],
      },
    ],
  },

  // Fallback
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

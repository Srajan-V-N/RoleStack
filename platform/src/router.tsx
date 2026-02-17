import { createBrowserRouter, Navigate } from "react-router";
import PlatformShell from "@/shared/components/layout/PlatformShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PlatformShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "dashboard",
        lazy: () => import("@/modules/dashboard/pages/UnifiedDashboard"),
      },
      {
        path: "rb/*",
        lazy: () => import("@/modules/rb/routes"),
      },
      {
        path: "prp/*",
        lazy: () => import("@/modules/prp/routes"),
      },
      {
        path: "jnt/*",
        lazy: () => import("@/modules/jnt/routes"),
      },
    ],
  },
]);

export default router;

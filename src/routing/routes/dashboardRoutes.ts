import DashboardPage from "@/features/dashboard/page";
import { RouteConfig } from "../types";

export const dashboardRoutes: RouteConfig[] = [
  {
    path: '/dashboard',
    element: DashboardPage,
    protected: true,
  },
];
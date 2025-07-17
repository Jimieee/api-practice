import DashboardPage from "@/features/dashboard/page";
import { RouteConfig } from "../types";
import ReservationsPage from "@/features/reservations/page";

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: DashboardPage,
    protected: true,
  },
  {
    path: "/reservations",
    element: ReservationsPage,
    protected: true,
  },
];

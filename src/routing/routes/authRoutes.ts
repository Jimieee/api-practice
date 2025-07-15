import { LoginPage } from "@/features/auth";
import { RouteConfig } from "../types/routing.types";

export const authRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: LoginPage,
    guestOnly: true,
  },
];

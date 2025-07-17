import { NavigationItem } from "@/components/molecules/Navigation/Navigation.types";
import { Home, Building } from "lucide-react";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Alojamientos",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: "properties",
    label: "Reservaciones",
    href: "/reservations",
    icon: Building,
  },
];

export const SIDEBAR_TITLE = "Panel de control";

import { ElementType } from "react";

export interface NavigationItem {
  id: string;
  label: string;
  icon?: ElementType;
  href: string;
  active?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
}

import { NavigationItem } from '@/components/molecules/Navigation/Navigation.types';

export interface SidebarProps {
  title?: string;
  navigationItems: NavigationItem[];
  onNavigationClick?: (item: NavigationItem) => void;
  onLogout?: () => void;
}
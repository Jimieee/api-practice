import { NavigationItem } from '@/components/molecules/Navigation/Navigation.types';

export interface DashboardTemplateProps {
  children: React.ReactNode;
  navigationItems: NavigationItem[];
  pageTitle: string;
  pageSubtitle?: string;
  headerActions?: React.ReactNode;
  sidebarTitle?: string;
  onNavigationClick?: (item: NavigationItem) => void;
  onLogout?: () => void;
}
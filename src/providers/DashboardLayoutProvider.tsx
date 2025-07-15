import React, { ReactNode, useMemo } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { NavigationItem } from '@/components/molecules/Navigation/Navigation.types';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardLayoutContext,
  DashboardLayoutContextType
} from './DashboardLayoutContext';
import { NAVIGATION_ITEMS, SIDEBAR_TITLE } from './navigationConstants';

interface DashboardLayoutProviderProps {
  children: ReactNode;
}

const isRouteActive = (itemHref: string, currentPath: string): boolean => {
  const normalizedItemHref = itemHref.endsWith('/') && itemHref !== '/'
    ? itemHref.slice(0, -1)
    : itemHref;
  const normalizedCurrentPath = currentPath.endsWith('/') && currentPath !== '/'
    ? currentPath.slice(0, -1)
    : currentPath;

  if (normalizedItemHref === '' || normalizedItemHref === '/') {
    return normalizedCurrentPath === '' || normalizedCurrentPath === '/';
  }

  return normalizedCurrentPath === normalizedItemHref ||
    normalizedCurrentPath.startsWith(normalizedItemHref + '/');
};

export const DashboardLayoutProvider: React.FC<DashboardLayoutProviderProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [pageTitle, setPageTitle] = React.useState('Dashboard');
  const [pageSubtitle, setPageSubtitle] = React.useState<string | undefined>();
  const [headerActions, setHeaderActions] = React.useState<ReactNode>();

  const navigationItemsWithActive = useMemo(() => {
    return NAVIGATION_ITEMS.map(item => ({
      ...item,
      active: isRouteActive(item.href, location.pathname)
    }));
  }, [location.pathname]);

  const handleNavigationClick = (item: NavigationItem) => {
    navigate(item.href);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const contextValue: DashboardLayoutContextType = {
    setPageTitle,
    setPageSubtitle,
    setHeaderActions,
  };

  return (
    <DashboardLayoutContext.Provider value={contextValue}>
      <DashboardTemplate
        navigationItems={navigationItemsWithActive}
        pageTitle={pageTitle}
        pageSubtitle={pageSubtitle}
        headerActions={headerActions}
        sidebarTitle={SIDEBAR_TITLE}
        onNavigationClick={handleNavigationClick}
        onLogout={handleLogout}
      >
        {children}
      </DashboardTemplate>
    </DashboardLayoutContext.Provider>
  );
};
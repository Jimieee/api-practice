import { createContext, useContext, ReactNode } from 'react';

export interface DashboardLayoutContextType {
  setPageTitle: (title: string) => void;
  setPageSubtitle: (subtitle?: string) => void;
  setHeaderActions: (actions?: ReactNode) => void;
}

export const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined);

export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error('useDashboardLayout must be used within a DashboardLayoutProvider');
  }
  return context;
};
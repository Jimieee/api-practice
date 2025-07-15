import { useState } from 'react';
import { Sidebar, Header } from '@/components/organisms';
import { DashboardTemplateProps } from './DashboardTemplate.types';

const DashboardTemplate = ({
  children,
  navigationItems,
  pageTitle,
  pageSubtitle,
  headerActions,
  sidebarTitle,
  onNavigationClick,
  onLogout
}: DashboardTemplateProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        title={sidebarTitle}
        navigationItems={navigationItems}
        onNavigationClick={(item) => {
          onNavigationClick?.(item);
          closeSidebar();
        }}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          actions={headerActions}
          onMenuToggle={toggleSidebar}
        />

        <main className="flex-1 p-4 sm:p-6 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardTemplate;
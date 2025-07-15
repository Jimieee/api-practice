import { LogOut, X } from 'lucide-react';
import { Button, Typography } from '@/components/atoms';
import { Navigation } from '@/components/molecules';
import { SidebarProps } from './Sidebar.types';
import { cn } from '@/lib/utils';

interface ResponsiveSidebarProps extends SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  title = 'Panel de Control',
  navigationItems,
  onNavigationClick,
  onLogout,
  isOpen = false,
  onClose
}: ResponsiveSidebarProps) => {
  return (
    <>
      <div className="hidden lg:flex w-64 bg-card border-r border-border fixed left-0 top-0 h-screen flex-col z-30">
        <div className="p-4 xl:p-6 border-b border-border">
          <div className="flex items-center">
            <Typography variant="h5" className="font-semibold text-foreground truncate">
              {title}
            </Typography>
          </div>
        </div>

        <div className="flex-1 p-3 xl:p-4 overflow-y-auto">
          <Navigation
            items={navigationItems}
            onItemClick={onNavigationClick}
          />
        </div>

        {onLogout && (
          <div className="p-3 xl:p-4 border-t border-border">
            <Button
              variant="ghost"
              fullWidth
              onClick={onLogout}
              icon={<LogOut className="w-4 h-4" />}
              className="justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              Cerrar Sesión
            </Button>
          </div>
        )}
      </div>

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:hidden",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        }
      )}>
        <div className="flex h-full flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <Typography variant="h5" className="font-semibold text-foreground truncate">
                {title}
              </Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon={<X className="w-4 h-4" />}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <Navigation
              items={navigationItems}
              onItemClick={onNavigationClick}
            />
          </div>

          {onLogout && (
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                fullWidth
                onClick={onLogout}
                icon={<LogOut className="w-4 h-4" />}
                className="justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                Cerrar Sesión
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
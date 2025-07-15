import { Menu } from 'lucide-react';
import { Button } from '@/components/atoms';
import { HeaderProps } from './Header.types';

interface ResponsiveHeaderProps extends HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({
  actions,
  onMenuToggle
}: ResponsiveHeaderProps) => {
  return (
    <div className="bg-card border-b border-border px-4 sm:px-6 py-4 sticky top-0 z-30 lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {onMenuToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              icon={<Menu className="w-5 h-5" />}
              className="text-muted-foreground hover:text-foreground"
            />
          )}
        </div>

        {actions && (
          <div className="flex items-center space-x-2 sm:space-x-3 ml-4 flex-shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-3">
              {actions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
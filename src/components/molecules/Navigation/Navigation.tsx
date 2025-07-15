import { cn } from '@/lib/utils';
import { Typography } from '@/components/atoms';
import { NavigationProps } from './Navigation.types';

const Navigation = ({ items, onItemClick }: NavigationProps) => {
  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className={cn(
            'w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors',
            item.active
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
              : 'text-slate-700 hover:bg-slate-100'
          )}
        >
          {item.icon && (
            <span className="mr-3 flex-shrink-0">
              <item.icon />
            </span>
          )}
          <Typography variant="body2" className="font-medium">
            {item.label}
          </Typography>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
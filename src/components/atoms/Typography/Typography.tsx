import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { TypographyProps, TypographyVariant, TypographyColor, TypographyAlign } from './Typography.types';

const Typography = forwardRef<
  HTMLElement,
  TypographyProps & Omit<React.HTMLAttributes<HTMLElement>, 'color'>
>(
  ({
    className,
    variant = 'body1',
    color = 'primary',
    align = 'left',
    as,
    children,
    ...props
  }, ref) => {
    const variants: Record<TypographyVariant, string> = {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      body1: 'text-base',
      body2: 'text-sm',
      caption: 'text-xs',
      overline: 'text-xs uppercase tracking-wide'
    };

    const colors: Record<TypographyColor, string> = {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      muted: 'text-slate-500',
      error: 'text-red-600',
      success: 'text-green-600',
      warning: 'text-amber-600'
    };

    const alignments: Record<TypographyAlign, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    };

    const Component = as || getDefaultComponent(variant);

    return (
      <Component
        ref={ref}
        className={cn(
          variants[variant],
          colors[color],
          alignments[align],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

const getDefaultComponent = (variant: TypographyVariant): keyof JSX.IntrinsicElements => {
  switch (variant) {
    case 'h1': return 'h1';
    case 'h2': return 'h2';
    case 'h3': return 'h3';
    case 'h4': return 'h4';
    case 'h5': return 'h5';
    case 'h6': return 'h6';
    case 'caption':
    case 'overline': return 'span';
    default: return 'p';
  }
};

Typography.displayName = 'Typography';

export default Typography;
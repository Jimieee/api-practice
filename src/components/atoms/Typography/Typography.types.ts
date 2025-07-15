import { ElementType, ReactNode } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning';
export type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps<T extends ElementType = ElementType> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  as?: T;
  children?: ReactNode;
}
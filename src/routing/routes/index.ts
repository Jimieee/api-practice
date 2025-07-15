import { RouteConfig } from '../types/routing.types';
import { authRoutes } from './authRoutes';
import { dashboardRoutes } from './dashboardRoutes';

export const routes: RouteConfig[] = [
  ...authRoutes,
  ...dashboardRoutes
];

export * from './authRoutes';

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthGuard, GuestGuard } from './guards';
import { routes } from './routes';

const createRoutes = () => {
  const routerRoutes = routes.map((route) => {
    const RouteComponent = route.element;

    if (route.protected) {
      return {
        path: route.path,
        element: (
          <AuthGuard>
            <RouteComponent />
          </AuthGuard>
        ),
      };
    }

    if (route.guestOnly) {
      return {
        path: route.path,
        element: (
          <GuestGuard>
            <RouteComponent />
          </GuestGuard>
        ),
      };
    }

    return {
      path: route.path,
      element: <RouteComponent />,
    };
  });

  return [
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    ...routerRoutes,
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
    },
  ];
};

const router = createBrowserRouter(createRoutes());

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
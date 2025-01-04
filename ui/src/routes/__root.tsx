import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navigation } from '../features/Navigation/Navigation';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/loginStore';

export const Route = createRootRoute({
  component: RenderComponent,
});

function RenderComponent() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          padding: 2, // Optional: adds some padding to the main content area
        }}
      >
        <Outlet />
      </Box>
      {/*<TanStackRouterDevtools />*/}
    </Box>
  );
}

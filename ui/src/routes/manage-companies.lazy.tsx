import {
  createLazyFileRoute,
  Link,
  Navigate,
  Outlet,
} from '@tanstack/react-router';
import { useAuthStore } from '../stores/loginStore';
import { Box, Button, Typography } from '@mui/material';
import Add from '@mui/icons-material/Add';

export const Route = createLazyFileRoute('/manage-companies')({
  component: ManageCompanies,
});

function ManageCompanies() {
  const { user } = useAuthStore();

  if (user?.role !== 'COMPANY_ADMIN') {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Company Management
      </Typography>
      <Button
        component={Link}
        to="/create-new-company"
        variant="contained"
        startIcon={<Add />}
      >
        Create New Company
      </Button>
      <Outlet />
    </Box>
  );
}

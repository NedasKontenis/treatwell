import {
  createLazyFileRoute,
  Link,
  Navigate,
  Outlet,
} from '@tanstack/react-router';
import { useAuthStore } from '../stores/loginStore';
import { Box, Button, Divider, Typography } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { CompaniesTable } from '../components/CompaniesTable/CompaniesTable';
import { useCompaniesByOwner } from '../hooks/useCompanies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';

export const Route = createLazyFileRoute('/manage-companies')({
  component: ManageCompanies,
});

function ManageCompanies() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useCompaniesByOwner();

  const updateCompanyMutation = useMutation({
    mutationFn: async (updatedCompany) => {
      const response = await api.put(
        `/companies/${updatedCompany.id}`,
        updatedCompany
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies', user?.id] });
    },
  });

  if (user?.role !== 'COMPANY_ADMIN') {
    return <Navigate to="/" />;
  }

  const handleCompanyUpdate = async (updatedCompany) => {
    try {
      await updateCompanyMutation.mutateAsync(updatedCompany);
    } catch (error) {
      console.error('Failed to update company:', error);
    }
  };

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
      <Divider sx={{ paddingY: 3 }} />
      {!isLoading && data && (
        <CompaniesTable
          companies={data}
          onCompanyUpdate={handleCompanyUpdate}
        />
      )}
    </Box>
  );
}

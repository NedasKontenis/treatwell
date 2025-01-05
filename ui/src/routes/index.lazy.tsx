import { createLazyFileRoute } from '@tanstack/react-router';
import { useCompanies } from '../hooks/useCompanies';
import { CompanyGrid } from '../components/CompanyGrid/CompanyGrid';
import { Stack } from '@mui/material';
import { SearchCompanies } from '../features/SearchCompanies/SearchCompanies';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useCompanies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No companies found.</div>;
  }

  return <CompanyGrid companies={data} />;
}

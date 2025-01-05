import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { CompanyReservations } from '../features/CompanyReservations/CompanyReservations';
import { useAuthStore } from '../stores/loginStore';
import { useCompaniesByOwner } from '../hooks/useCompanies';

export const Route = createLazyFileRoute('/company-reservations')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();
  const { data: companies, isLoading: isCompaniesLoading } =
    useCompaniesByOwner();

  if (user?.role !== 'COMPANY_ADMIN') {
    return <Navigate to="/" />;
  }

  if (isCompaniesLoading || !companies) {
    return <h2>Loading...</h2>;
  }

  return <CompanyReservations companies={companies} />;
}

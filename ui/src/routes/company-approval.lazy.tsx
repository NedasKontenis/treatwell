import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { CompanyApproval } from '../features/CompanyApproval/CompanyApproval';
import { useAuthStore } from '../stores/loginStore';
import { useCompanies } from '../hooks/useCompanies';

export const Route = createLazyFileRoute('/company-approval')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();
  const { data, isLoading } = useCompanies(false, 'not-approved-companies');

  if (user?.role !== 'SYSTEM_ADMIN') {
    return <Navigate to="/" />;
  }

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }

  const filterCancelledSubmissions = data.filter(
    (company) => !company.submissionCancelled
  );

  return <CompanyApproval companies={filterCancelledSubmissions} />;
}

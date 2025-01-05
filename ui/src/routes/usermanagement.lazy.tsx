import { createLazyFileRoute } from '@tanstack/react-router'
import { UserManagement } from '../features/Usermanagement/Usermanagement';

export const Route = createLazyFileRoute('/usermanagement')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserManagement />;
}

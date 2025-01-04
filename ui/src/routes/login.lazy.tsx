import { createLazyFileRoute } from '@tanstack/react-router';
import { Login } from '../features/Login/Login';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}

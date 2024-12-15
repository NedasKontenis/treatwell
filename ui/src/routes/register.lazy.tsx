import { createLazyFileRoute } from '@tanstack/react-router';
import { RegisterForm } from '../features/RegistrationForm/RegistrationForm';

export const Route = createLazyFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}

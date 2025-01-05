import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { MyReservations } from '../features/MyReservations/MyReservations';
import { useAuthStore } from '../stores/loginStore';

export const Route = createLazyFileRoute('/my-reservations')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();

  if (user?.role !== 'USER' && user?.role !== 'SYSTEM_ADMIN') {
    return <Navigate to="/" />;
  }

  return <MyReservations />;
}

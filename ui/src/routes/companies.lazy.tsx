import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/companies')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/companies"!</div>;
}

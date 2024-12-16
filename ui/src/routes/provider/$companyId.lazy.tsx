import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/provider/$companyId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/provider/$companyId"!</div>
}

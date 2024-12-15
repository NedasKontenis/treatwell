import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company-details/$companyId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company-details/$companyId"!</div>
}

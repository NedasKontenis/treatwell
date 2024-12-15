import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/manage-companies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage-companies"!</div>
}

import {createLazyFileRoute} from '@tanstack/react-router'
import { Reservations } from '../features/Reservations/Reservations';
export const Route = createLazyFileRoute('/Reservations')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Reservations />;
}

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { api } from '../../api/api'; // Assuming the API configuration is imported from api.ts

// Define the reservation and service types
interface Reservation {
    id: number;
    dateTime: string;
    notes: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    totalPrice: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
    };
    service: {
        id: number;
        name: string;
    };
}

interface Service {
    id: number;
    name: string;
}

export const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<number | null>(null);

    const localizer = momentLocalizer(moment);

    useEffect(() => {
        // Fetch all reservations and services
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservations');
                setReservations(response.data);
                setFilteredReservations(response.data);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await api.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };

        fetchReservations();
        fetchServices();
    }, []);

    // Filter reservations based on selected service
    useEffect(() => {
        if (selectedService) {
            setFilteredReservations(reservations.filter(res => res.service.id === selectedService));
        } else {
            setFilteredReservations(reservations);
        }
    }, [selectedService, reservations]);

    const eventStyleGetter = (event: Reservation) => {
        const backgroundColor =
            event.status === 'CONFIRMED'
                ? '#28a745' // Green for confirmed
                : event.status === 'PENDING'
                    ? '#ffc107' // Yellow for pending
                    : '#dc3545'; // Red for cancelled
        return { style: { backgroundColor, color: '#fff' } };
    };

    return (
      <div>
        <h1>Rezervacijų Peržiūra</h1>

        {/* Service filter */}
        <div>
          <label htmlFor="serviceFilter">Filtruoti pagal paslaugą: </label>
          <select
            id="serviceFilter"
            onChange={(e) => setSelectedService(Number(e.target.value) || null)}
          >
            <option value="">Visos paslaugos</option>
            <option value="">BEAUTY</option>
            <option value="">HEALTH</option>
            <option value="">FITNESS</option>
            <option value="">OTHER</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Calendar view */}
        <Calendar
          localizer={localizer}
          // events={filteredReservations.map((res) => ({
          //     id: res.id,
          //     title: `${res.service.name} - ${res.user.firstName} ${res.user.lastName}`,
          //     start: new Date(res.dateTime),
          //     end: new Date(res.dateTime),
          //     resource: res,
          // }))}
          style={{ height: '500px', margin: '20px 0' }}
          eventPropGetter={(event) => eventStyleGetter(event.resource)}
          onSelectEvent={(event) => {
            const reservation = event.resource as Reservation;
            alert(
              `Rezervacijos informacija:\n- Paslauga: ${reservation.service.name}\n- Vartotojas: ${reservation.user.firstName} ${reservation.user.lastName}\n- Kaina: ${reservation.totalPrice}€\n- Pastabos: ${reservation.notes}\n- Statusas: ${reservation.status}`
            );
          }}
        />
      </div>
    );
};



// src/components/Reservation.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeReservation } from '../services/api';

const Reservation = () => {
    const { state } = useLocation();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleReservation = async () => {
        try {
            await makeReservation({ serviceId: state.serviceId, date, time });
            alert('Reservation successful!');
        } catch (error) {
            alert('Reservation failed');
        }
    };

    return (
        <div>
            <h2>Make a Reservation</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <button onClick={handleReservation}>Reserve</button>
        </div>
    );
};

export default Reservation;

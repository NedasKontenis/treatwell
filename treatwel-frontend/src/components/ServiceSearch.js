// src/components/ServiceSearch.js
import React, { useState } from 'react';
import { searchServices } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ServiceSearch = () => {
    const [query, setQuery] = useState('');
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        const { data } = await searchServices(query);
        setServices(data);
    };

    const handleReserve = (serviceId) => {
        navigate('/reservation', { state: { serviceId } });
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services" />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        {service.name}
                        <button onClick={() => handleReserve(service.id)}>Reserve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSearch;

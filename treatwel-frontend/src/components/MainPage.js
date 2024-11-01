// src/components/MainPage.js
import React, {useEffect, useState} from 'react';
import './MainPage.css';
import { getAllServices } from '../services/api';


const MainPage = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getAllServices();
                const data = await response.json();

                // Debugging step: Check what `data` looks like
                console.log("Fetched data:", data);

                // Ensure data is an array before setting it
                setServices(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="main-page">
            <h1>Available Services</h1>
            <div className="services-list">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div className="service-card" key={service.id}>
                            <h3>{service.name}</h3>
                            <p>{service.companyName}</p>
                            <button>Register & Reserve Time</button>
                        </div>
                    ))
                ) : (
                    <p>No services available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default MainPage;

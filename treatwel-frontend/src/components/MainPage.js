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

                // Debugging step: Check what `response` looks like
                console.log("Fetched response:", response);

                // Access services from the data property
                if (response && Array.isArray(response.data)) {
                    setServices(response.data); // Set the services directly from response.data
                    console.log("Services set:", response.data);
                } else {
                    console.warn("Services not found in response:", response);
                    setServices([]); // Set services to an empty array if not found
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    // Debugging: Check the number of services
    console.log("Number of services:", services.length);

    return (
        <div className="main-page">
            <h1>Available Services</h1>
            <div className="services-list">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div className="service-card" key={service.id}>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
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

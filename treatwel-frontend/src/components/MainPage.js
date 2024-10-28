// src/components/MainPage.js
import React from 'react';
import './MainPage.css';

const MainPage = () => {
    return (
        <div className="main-page">
            <h1>Available Services</h1>
            <div className="services-list">
                {/* Example services list; replace with actual data later */}
                <div className="service-card">
                    <h3>Service 1</h3>
                    <p>Company A</p>
                    <button>Register & Reserve Time</button>
                </div>
                <div className="service-card">
                    <h3>Service 2</h3>
                    <p>Company B</p>
                    <button>Register & Reserve Time</button>
                </div>
                {/* Add more services as needed */}
            </div>
        </div>
    );
};

export default MainPage;

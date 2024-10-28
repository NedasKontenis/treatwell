// src/components/Dashboard.js
import React, { useState } from 'react';
import { createCompany, createService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [companyName, setCompanyName] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');

    const handleCompanySubmit = async (e) => {
        e.preventDefault();
        try {
            await createCompany({ name: companyName });
            alert('Company created successfully!');
            setCompanyName('');
        } catch (error) {
            alert('Failed to create company');
        }
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            await createService({ name: serviceName, description: serviceDescription });
            alert('Service created successfully!');
            setServiceName('');
            setServiceDescription('');
        } catch (error) {
            alert('Failed to create service');
        }
    };

    return (
        <div className="dashboard">
            <h2>Company Representative Dashboard</h2>

            <form onSubmit={handleCompanySubmit} className="form-section">
                <h3>Create Company</h3>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <button type="submit">Create Company</button>
            </form>

            <form onSubmit={handleServiceSubmit} className="form-section">
                <h3>Add Service</h3>
                <input
                    type="text"
                    placeholder="Service Name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Service Description"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    required
                />
                <button type="submit">Add Service</button>
            </form>
        </div>
    );
};

export default Dashboard;

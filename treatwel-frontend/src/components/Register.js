// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Auth.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Client'); // Role selection
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await registerUser( { email, password, role }, {headers: { 'Content-Type': 'application/json' } });
            alert('Registration successful!');
            navigate(role === 'Company Representative' ? '/dashboard' : '/main'); // Navigate based on role
        } catch (error) {
            console.error("Registration error:", error.response ? error.response.data : error.message);
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="Client">Client</option>
                            <option value="Company Representative">Company Representative</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-button">Register</button>
                </form>
                <p className="switch-auth">
                    Already have an account? <span onClick={() => navigate('/')}>Login here</span>
                </p>
            </div>
        </div>
    );
};

export default Register;

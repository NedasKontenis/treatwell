// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    // const handleLogin = async () => {
    //     try {
    //         const response = await axios.post('http://10.0.2.2:8080/auth/login', { email, password });
    //         console.log('Response data:', response.data); // Check response in console
    //         if (response.status === 200) {
    //             navigate('/main');
    //         } else {
    //             alert('Login failed: Check your credentials.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error.response ? error.response.data : error.message);
    //         alert('Login failed. Please check the console for more details.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
            navigate('/main'); // Redirect to the main page
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
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
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="switch-auth">
                    Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
                </p>
            </div>
        </div>
    );
};

export default Login;

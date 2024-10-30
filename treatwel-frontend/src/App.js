// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';

const App = () => {
    return (

    <div className="app">
        <header className="app-header">
            <div className="logo-container">
                <img src="logo.png" alt="Logo" className="logo"/>
            </div>
            <h1 className="app-title">Service Reservation System</h1>
        </header>
        {     <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/> {/* Dashboard for representatives */}
            </Routes>
        </Router>}
    </div>
);
};

export default App;

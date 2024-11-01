// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';

import Home from "./components/Home";
const App = () => {
    return (

    <div className="app">
        {  <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/> {/* Dashboard for representatives */}
            </Routes>
        </Router>}
    </div>
);
};

export default App;

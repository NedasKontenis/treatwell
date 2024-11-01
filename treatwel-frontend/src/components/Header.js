import React from 'react';
import './Header.css';
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform any login logic here if needed
        navigate('/login'); // Redirect to home page or any other page
    };

    const handleBusiness = () => {
        // Perform any login logic here if needed
        navigate('/Dashboard'); // Redirect to home page or any other page
    };
    return (


        <header className="header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <nav className="navigation">
                <a href="#plaukai">Plaukai</a>
                <a href="#nagai">Nagai</a>
                <a href="#depiliacija">Depiliacija</a>
                <a href="#masazas">Masažas</a>
                <a href="#veidas">Veidas</a>
                <a href="#kuno">Kūno</a>
            </nav>
            <div className="auth-links">
                <button onClick={handleBusiness}>Tavo Verslui</button>
                <button onClick={handleLogin}>Prisijungti</button>
            </div>
        </header>
    );
}

export default Header;
import Header from "./Header";
import SearchBar from "./SearchBar";
import ServiceCategories from "./ServiceCategories";

import React from "react";

const Home = () => {
    return (
        <div className="app">
            <header className="app-header">
                <div className="logo-container">
                    <Header />
                    <SearchBar />
                    <ServiceCategories />
                    <img src="logo.png" alt="Logo" className="logo"/>
                </div>
            </header>
        </div>
    );
};

export default Home;
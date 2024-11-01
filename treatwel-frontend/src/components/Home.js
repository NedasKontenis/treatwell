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
                </div>
            </header>
        </div>
    );
};

export default Home;
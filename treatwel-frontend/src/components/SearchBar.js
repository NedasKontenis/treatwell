import React from 'react';
import './SearchBar.css';

function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Įvesk paslaugą" />
            <input type="text" placeholder="Įvesk rajoną" />
            <input type="date" placeholder="Data nesvarbu" />
            <button className="search-button">Ieškoti</button>
        </div>
    );
}

export default SearchBar;

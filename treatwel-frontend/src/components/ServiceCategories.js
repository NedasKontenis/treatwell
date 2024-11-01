import React from 'react';
import './ServiceCategories.css';

function ServiceCategories() {
    return (
        <div className="service-categories">
            <div className="category">
                <img src="/icon1.png" alt="Ikona" />
                <h3>Patrauklios kainos</h3>
                <p>Užsisakyk paskutinę minutę arba ramensiu salono laiku.</p>
            </div>
            <div className="category">
                <img src="/icon2.png" alt="Ikona" />
                <h3>Užsisakyk visą parą</h3>
                <p>Lovoj ar važiuojant autobusu.</p>
            </div>
            <div className="category">
                <img src="/icon3.png" alt="Ikona" />
                <h3>Rinkis iš geriausių salonų</h3>
                <p>Šimtai salonų (bei atsiliepimų).</p>
            </div>
        </div>
    );
}

export default ServiceCategories;

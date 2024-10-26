import React, { useState, useEffect } from 'react';
import "../styles/Tarjeta.css";

function Tarjeta({ grupoId }) {
    const [tarjetas, setTarjetas] = useState([]);

    useEffect(() => {
        // URL con el ID de grupo o sin él para traer todas las tarjetas
        const url = grupoId 
            ? `http://localhost:3001/api/tarjetas/${grupoId}` 
            : `http://localhost:3001/api/tarjetas`;

        fetch(url)
            .then(response => response.json())
            .then(data => setTarjetas(data))
            .catch(error => console.error('Error al cargar tarjetas:', error));
    }, [grupoId]);

    return (
        <div className="tarjeta-container">
            {tarjetas.map((tarjeta, index) => (
                <div key={index} className="tarjeta">
                    <div className="grupo-fecha">Grupo: {tarjeta.grupo} | Fecha: {tarjeta.fecha}</div>
                    <h1>{tarjeta.titulo}</h1>
                    <p>{tarjeta.descripcion}</p>
                    <div className="footer">
                        <span>{tarjeta.autor}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Tarjeta;

import React, { useState, useEffect } from 'react';
import "../styles/Tarjeta.css";

function Tarjeta() {
    // Cuando se conecte con la base de datos, aqui esta la idea de codigo para conectarlo
    // const [tarjetas, setTarjetas] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:3001/api/tarjetas')
    //         .then(response => response.json())
    //         .then(data => setTarjetas(data))
    //         .catch(error => console.error('Error al cargar tarjetas:', error));
    // }, []);

    return (
        <div className="tarjeta-container">
            <div className="tarjeta">
            <div className="grupo-fecha">Grupo: Personal<br></br>Fecha: 24 Octubre 2024</div>
            <h1>Cumpleaños Maydita :)</h1>
            <p>Key things I've learned from studying top design system examples to help you build or improve your own design system.</p>
            <div className="footer">
                {/* <img src="https://via.placeholder.com/30" alt="User" /> */}
                <span>Un random</span>
            </div>
    </div>
            {/* El codigo de las tarjetas enlacedas con la api */}
            {/* {tarjetas.map((tarjeta, index) => (
                <div key={index} className="tarjeta">
                    <div className="grupo-fecha">Grupo: {tarjeta.grupo} | Fecha: {tarjeta.fecha}</div>
                    <h1>{tarjeta.titulo}</h1>
                    <p>{tarjeta.descripcion}</p>
                    <div className="footer">
                        <img src="https://via.placeholder.com/30" alt="User" />
                        <span>{tarjeta.autor}</span>
                        <span> - {tarjeta.fecha_publicacion}</span>
                    </div>
                </div>
            ))} */}


        </div>
    );
}

export default Tarjeta;

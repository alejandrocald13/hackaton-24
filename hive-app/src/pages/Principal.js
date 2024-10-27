import React, { useState, useEffect } from "react";
import "../styles/Principal.css"
import Tarjeta from "../components/Tarjeta"
import Header from "../components/Header"


function Principal() {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowMessage(window.innerWidth >= 501 && window.innerWidth <= 900);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Ejecutar al cargar

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className="principal">
                <Header/>
                <div className="display_tarjetas">
                    <Tarjeta/>
                    <Tarjeta/>
                    <Tarjeta/>
                    <Tarjeta/>
                    <Tarjeta/>
                    <Tarjeta/>
                    <Tarjeta/>

                    <Tarjeta/><Tarjeta/>

                </div>
            </div>
        {showMessage && (
            <div className="no-format-message">
                El formato de pantalla no es aceptado.
            </div>
        )}
        </div>
        
    )
}

export default Principal
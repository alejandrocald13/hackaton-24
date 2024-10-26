import React, { useState, useEffect } from "react";
import "../styles/Miembros.css";

function Miembros() {
    const [showMessage, setShowMessage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    
    const miembrosIniciales = ["Carlos", "Ana", "Pedro", "Lucía", "María", "Jorge", "Mario"];
    const [miembros, setMiembros] = useState(miembrosIniciales);

    // Filtrar miembros por la letra inicial, mostrar todos si no hay búsqueda
    const miembrosFiltrados = busqueda === "" 
        ? miembros // Mostrar todos los miembros si no hay búsqueda
        : miembros.filter(miembro =>
            miembro.charAt(0).toLowerCase() === busqueda.toLowerCase() // Comparar solo la letra inicial
        );

    const toggleModal = () => setShowModal(!showModal);

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
            <div className="miembros">
                <button onClick={toggleModal} className="abrir-modal">
                    Ver Miembros
                </button>

                {showModal && (
                    <div className="modal">
                        <div className="modal-contenido">
                            <h1 className="titulo">Miembros del grupo</h1>
                            <input 
                                type="text" 
                                placeholder="Buscar miembro..." 
                                value={busqueda} 
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="busqueda"
                            />
                            <ul className="lista-miembros">
                                {miembrosFiltrados.map((miembro, index) => (
                                    <li key={index} className="miembro-item">
                                        {miembro}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={toggleModal} className="cerrar-modal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showMessage && (
                <div className="no-format-message">
                    El formato de pantalla no es aceptado.
                </div>
            )}
        </div>
    );
}

export default Miembros;

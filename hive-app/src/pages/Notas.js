import React, { useState } from "react";
import "../styles/Notas.css"

function Notas() {
    
    const [description, setDescription] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSave = () => {
        console.log("Nota guardada:", description); // Aquí se guarda la nota
        setDescription("");
        setIsOpen(false);
    };

    return (
        <div className="notas">
            <h1 className="titulo">Sección de notas</h1>
            
            <button className="open-modal-btn" onClick={toggleModal}>
                    Agregar nota
            </button>
            {isOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <p className="tittle-flotante">
                        Ingresar una nota
                    </p> 
                        <input
                        type="text"
                        id="Descripción de la nota"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ingresa la nota a guardar"
                        />
                    <button className="close-modal-btn" onClick={handleSave}>
                        Guardar
                    </button>

                </div>
                </div>
            )} 

            <div className="nota">
                <p className="nota-description">
                    "{description}"
                </p>
                <div className="date-details">
                    <p className="day">15</p>
                    <p className="month">Noviembre</p>
                </div>
            </div>

        </div>

    )
}

export default Notas
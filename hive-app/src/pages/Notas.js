import React, { useState } from "react";
import "../styles/Notas.css";
import Nota from "../components/Nota";


function Notas() {
    
    const [description, setDescription] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSave = () => {
        console.log("Nota guardada:", description); // Aquí se guarda la nota
        
        console.log(description);
        console.log(fechaCompleta);
        // enviar descripción
        // enviar fecha completa

        setDescription("");
        setIsOpen(false);
    };

    const fechaActual = new Date();

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const dia = fechaActual.getDate();
    const anio = fechaActual.getFullYear();
    const fechaCompleta = dia + " " + meses[fechaActual.getMonth()] + " " + anio;


    /* A la hora de reciperar la fecha de la base se empleara esto para dejarlo en el formato de la nota dia - mes año*/
    const partesFecha = fechaCompleta.split(" ");

    const diaNota = partesFecha[0];
    const mesConAnioNota = partesFecha[1] + " " + partesFecha[2];


    return (
        <div className="notas-container">
            <div className="button-container">
                <button className="open-modal-btn" onClick={toggleModal}>Agregar nota</button>
            </div>
            <div className=".modal-container-notas">
                
            </div>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="tittle-flotante">Ingresar una nota</p> 
                        <input
                            type="text"
                            id="Descripción de la nota"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ingresa la nota a guardar"
                        />
                        <button className="close-modal-btn" onClick={handleSave}>Guardar</button>
                    </div>
                </div>
            )}
            
            <div className="notas">
                <Nota description="Texto de ejemplo" dia={diaNota} mesNombre_anio={mesConAnioNota} />
            </div>
            
        </div>
        
        
    );
}

export default Notas
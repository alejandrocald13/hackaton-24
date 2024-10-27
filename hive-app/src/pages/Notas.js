import React, { useState } from "react";
import "../styles/Notas.css";
import Nota from "../components/Nota";


function Notas() {
    
    const [description, setDescription] = useState('');
    const [fechaCompleta, setfechaCompleta] = useState('');
    const [notas, setNotas] = useState([]); // Arreglo para almacenar las notas de manera local o cuando se tenga la bd con la bd

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    /*useEffect(() => {
        fetch("URL_DE_TU_API")
            .then(response => response.json())
            .then(data => {
                // Asegúrate de que `data` tenga la estructura correcta antes de almacenarlo
                if (Array.isArray(data)) {
                    setNotas(data); // Almacena los datos en el estado `notas`
                } else {
                    console.error("Datos de la API no son un array:", data);
                }
            })
            .catch(error => console.error("Error al cargar las notas:", error));
    }, []);*/

    const handleSave = () => {
        const fechaActual = new Date();
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const dia = fechaActual.getDate();
        const anio = fechaActual.getFullYear();
        const fechaCompleta = `${dia} ${meses[fechaActual.getMonth()]} ${anio}`;
        setfechaCompleta(fechaCompleta);

        // Crear nueva nota con descripción y fecha
        const nuevaNota = { description, fechaCompleta };
        setNotas([...notas, nuevaNota]); // Agregar nueva nota al arreglo de las notas
        
        console.log("descripcion: ", description);
        console.log(fechaCompleta);

        setDescription("");
        setIsOpen(false);
    };

    /*const fechaActual = new Date();

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const dia = fechaActual.getDate();
    const anio = fechaActual.getFullYear();
    const fechaCompleta = dia + " " + meses[fechaActual.getMonth()] + " " + anio;*/

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
            
            {/*<div className="notas">
                {notas.map((nota, index) => (
                    <Nota
                        key={index}
                        description={nota.description}
                        dia={nota.fechaCompleta.split(" ")[0]} 
                        mesNombre_anio={nota.fechaCompleta.split(" ").slice(1).join(" ")}
                    />
                ))}
            </div>*/}
            {notas.length > 0 && (
                <div className="notas">
                    {notas.map((nota, index) => (
                        <Nota
                            key={index}
                            description={nota.description}
                            /* A la hora de recuperar la fecha de la base se empleara esto para dejarlo en el formato de la nota dia - mes año*/
                            dia={nota.fechaCompleta.split(" ")[0]} 
                            mesNombre_anio={nota.fechaCompleta.split(" ").slice(1).join(" ")}
                        />
                    ))}
                </div>
            )}
            
        </div>
        
        
    );
}

export default Notas
import React, { useState } from "react";
import "../styles/Notas.css";
import Nota from "../components/Nota";


function Notas() {
    
    const [description, setDescription] = useState('');
    const [prueba, setPrueba] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSave = () => {
        console.log("Nota guardada:", description); // Aquí se guarda la nota
        setDescription("");
        setIsOpen(false);
    };

    const fechaActual = new Date();

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const dia = fechaActual.getDate();
    const anio = fechaActual.getFullYear();
    const mesNombre_anio = meses[fechaActual.getMonth()] + " " + anio;

    const fechaFormateada = dia + ' de ' + mesNombre_anio;
    console.log(fechaFormateada);

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
                        <input
                            type="text"
                            id="Descripción de la nota"
                            value={prueba}
                            onChange={(e) => setPrueba(e.target.value)}
                            placeholder="Ingresa la nota a guardar"
                        />
                        <button className="close-modal-btn" onClick={handleSave}>Guardar</button>
                    </div>
                </div>
            )}
            
            <div className="notas">
                <Nota description="Texto de ejemplo" dia={dia} mesNombre_anio={mesNombre_anio} />
                <Nota description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." dia={dia} mesNombre_anio={mesNombre_anio} />
                <Nota />
                <Nota />
                <Nota /><Nota description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." dia={dia} mesNombre_anio={mesNombre_anio} />
                <Nota />
                <Nota description="align-items: center en .notas-container ayuda a centrar su contenido horizontalmente.
grid-template-columns: 1fr en .notas hará que las notas se muestren en una sola columna, lo que es ideal en pantallas pequeñas.
max-width: 300px en .notas restringe el ancho máximo de las notas, para que no ocupen más espacio del necesario en pantallas pequeñas."/>
                <Nota />
                <Nota />
                <Nota /><Nota description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." dia={dia} mesNombre_anio={mesNombre_anio} />
                <Nota />
            </div>
        </div>
        
        
    );
}

export default Notas
import React, { useState } from "react";
import "../styles/Notas.css"
import Nav from "../components/Nav"


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

    const abrir = ()=> {
        const nav = document.querySelector("nav")
        nav.style.display = "block"
    }

    const fechaActual = new Date();

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const dia = fechaActual.getDate();
    const mesNombre = meses[fechaActual.getMonth()];

    const fechaFormateada = dia + ' de ' + mesNombre;
    console.log(fechaFormateada);

    return (
        <div className="head">
            <Nav/>
            <div className="top">
                <h1 className="tittle">Hive</h1>
                <button className="menu" onClick={abrir}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg></button>
            </div>

            <div className="button">
                <button className="open-modal-btn" onClick={toggleModal}>
                        Agregar nota
                </button>
            </div>

            <div className="notas">
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
                            <input
                            type="text"
                            id="Descripción de la nota"
                            value={prueba}
                            onChange={(e) => setPrueba(e.target.value)}
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
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                        "{prueba}"
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                        "{description}"
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                    "{prueba}"
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                        "{description}"
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                        "{description}"
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
                <div className="nota">
                    <p className="nota-description">
                        "{description}"
                    </p>
                    <div className="date-details">
                        <p className="day">{dia}</p>
                        <p className="month">{mesNombre}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Notas
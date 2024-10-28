import React, { useEffect, useState } from "react";
import "../styles/Notas.css";
import Nota from "../components/Nota";


function Notas() {
    const [selectedNota, setSelectedNota] = useState(null);
    const [information, setDescription] = useState('');
    const [fechaCompleta, setfechaCompleta] = useState('');
    const [notas, setNotas] = useState([]); // Arreglo para almacenar las notas de manera local o cuando se tenga la bd con la bd

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // mostrar notas
    const fetchNotas = async () => {
        
        const idUser = "DANI";
        const response = await fetch('http://localhost:3001/api/getNotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser })
        });
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                setNotas(data);
                console.log("loa datos si estan chidos")
            } else {
                console.error("Los datos recibidos no son un arreglo:", data);
            }
            // Asegúrate de que 'data' tenga la estructura correcta
        }
    };
    useEffect(() => {
        fetchNotas();
    }, []);

    // Eliminar Nota
    const handleDelete = async() => {
        const idNote = selectedNota?.idNote;
        const idUser = selectedNota?.idUser;

        const response = await fetch('http://localhost:3001/api/deleteNotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idNote, idUser})
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Se elimino correctamente", data)
            setNotas(prevNotas => [...prevNotas]);
            // Asegúrate de que 'data' tenga la estructura correcta
        }else{
            console.log("No se elimino")
        }

    };
    
    // Ingresar nota
    const handleSave = async() => {
        const fechaActual = new Date();
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const dia = fechaActual.getDate();
        const anio = fechaActual.getFullYear();
        const confirmatedDate = `${dia} ${fechaActual.getMonth()} ${anio}`;
        setfechaCompleta(confirmatedDate);

        const idUser = "DANI";
        const nuevaNota = { idUser, information, confirmatedDate};

        const response = await fetch('http://localhost:3001/api/insertNote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaNota),
          });
          if (response.ok) {
            alert('Se ha registrado la nota');
            setNotas(prevNotas => [...prevNotas, nuevaNota]);
          } else {
            alert('Error al registrar la nota');
          }

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
                <button className="cancel-modal-btn" onClick={handleDelete}>Eliminar pendiente</button>
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
                            value={information}
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
                    {notas.map((nota, index) => {
                        return (
                            <div onClick={() => {
                                    setSelectedNota(nota);
                                    console.log("Detalles de la Nota:", nota); // Imprimir detalles en consola
                                }} 
                                key={index}
                            >
                                <Nota
                                    description={nota.information || "Sin descripción"}
                                    dia={nota.confirmatedDate ? nota.confirmatedDate.split(" ")[0] : "Sin día"} 
                                    mesNombre_anio={nota.confirmatedDate ? nota.confirmatedDate.split(" ").slice(1).join(" ") : "Sin mes/año"}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
            
        </div>
        
        
    );
}

export default Notas
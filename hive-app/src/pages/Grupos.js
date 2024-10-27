import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Grupos.css";
import Header from "../components/Header";

function Grupos() {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate(); 
  const [activeSection, setActiveSection] = useState(null);
  const [grupos, setGrupos] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoGrupo, setNuevoGrupo] = useState({
    title: "",
    integrantes: [], 
    tipo: "Personal",
  });
  const [integranteInput, setIntegranteInput] = useState(""); 

  // Función para cargar los grupos desde la base de datos
  // Roberto Calderon 
  const fetchGrupos = async () => {

    // const username = localStorage.getItem('username'); // para el login final

    const username = "alejandrocald13";

    // llama a la api

    const response = await fetch('http://localhost:3001/api/fetch-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username}),
    });

    if (response.ok) {
      // convierte la data en un json con {idUser, idGroup, groupName, createdDate, type (0 - p, 1 - a), creatorUser}
      const data = await response.json();
      setGrupos(data);
    }

  };

  useEffect(() => {
    fetchGrupos();
  }, []);

  const abrirModal = () => {
    setActiveSection(null);
    setIsModalOpen(true);
    setNuevoGrupo({ title: "", integrantes: [], tipo: "Personal" }); 
    setIntegranteInput("");
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNuevoGrupo({
      ...nuevoGrupo,
      [e.target.name]: e.target.value,
    });
  };

  const agregarIntegrante = () => {
    if (integranteInput.trim() !== "") {
      setNuevoGrupo((prev) => ({
        ...prev,
        integrantes: [...prev.integrantes, integranteInput],
      }));
      setIntegranteInput(""); 
    }
  };

  const eliminarIntegrante = (index) => {
    setNuevoGrupo((prev) => {
      const newIntegrantes = prev.integrantes.filter((_, i) => i !== index);
      return { ...prev, integrantes: newIntegrantes };
    });
  };

  // Mandar la info del nuevo grupo creado a la base de datos 
  const agregarGrupo = async () => {
    const userId = localStorage.getItem("userId"); // Se supone que tienes el id guardado en localStorage
    const fechaCreacion = new Date().toISOString(); // Fecha actual en formato ISO
    
    const nuevoGrupoObj = {
      title: nuevoGrupo.title,
      tipo: nuevoGrupo.tipo,
      fechaCreacion,
      userId
    };
    
    try {
      await fetch("URL_DE_TU_API/crear-grupo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGrupoObj),
      });
      cerrarModal(); 
      fetchGrupos(); 
    } catch (error) {
      console.error("Error al agregar el grupo:", error);
    }
  };


  const handleNavigate = (tipo) => {
    navigate(`/${tipo.toLowerCase()}-grupos`); 
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index); 
  };

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
      <div className="grupos">
        <Header />
        <h1 className="titulo">Grupos a los que perteneces</h1>

        <button onClick={abrirModal} className="crear-grupo-btn">
          Crear Nuevo Grupo
        </button>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Nuevo Grupo</h2>
              <input
                type="text"
                name="title"
                placeholder="Nombre del grupo"
                value={nuevoGrupo.title}
                onChange={handleInputChange}
              />
              <ul>
                {nuevoGrupo.integrantes.map((integrante, index) => (
                  <li key={index}>
                    {integrante}
                    <button onClick={() => eliminarIntegrante(index)}>Eliminar</button>
                  </li>
                ))}
              </ul>
              <label>
                Tipo de grupo:
                <select
                  name="tipo"
                  value={nuevoGrupo.tipo}
                  onChange={handleInputChange}
                >
                  <option value="Personal">Personal</option>
                  <option value="Académico">Académico</option>
                </select>
              </label>
              <button onClick={agregarGrupo}>Agregar Grupo</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        )}

        <div className="grupo-categorias">
          <h2 className="h2_personales" onClick={() => toggleSection(0)}>
            Grupos Personales
            <span className="toggle-icon">
              {activeSection === 0 ? "▲" : "▼"}
            </span>
          </h2>
          {activeSection === 0 && (
            <div className="grupo-list">
              {grupos
                .filter(grupo => grupo.tipo === "Personal")
                .map((grupo, index) => (
                  <div key={index} className="grupo-item">
                    <div className="grupo-title" onClick={() => handleNavigate("personal")}>
                      {grupo.groupName}
                    </div>
                  </div>
                ))}
            </div>
          )}

          <h2 className="h2_academicos" onClick={() => toggleSection(1)}>
            Grupos Académicos
            <span className="toggle-icon">
              {activeSection === 1 ? "▲" : "▼"}
            </span>
          </h2>
          {activeSection === 1 && (
            <div className="grupo-list">
              {grupos
                .filter(grupo => grupo.tipo === "Académico")
                .map((grupo, index) => (
                  <div key={index} className="grupo-item">
                    <div className="grupo-title" onClick={() => handleNavigate("academico")}>
                      {grupo.groupName}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {showMessage && (
                <div className="no-format-message">
                    El formato de pantalla no es aceptado.
                </div>
            )}
    </div>
  );
}

export default Grupos;

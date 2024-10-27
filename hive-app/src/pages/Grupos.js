import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Grupos.css";
import Header from "../components/Header";

function Grupos() {
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
  const fetchGrupos = async () => {
    try {
      const response = await fetch("URL_DE_TU_API"); // Reemplazar con la base de datos
      const data = await response.json();
      setGrupos(data); 
    } catch (error) {
      console.error("Error al cargar los grupos:", error);
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

  const agregarGrupo = async () => {
    const nuevoGrupoObj = {
      title: nuevoGrupo.title,
      content: `Integrantes: ${nuevoGrupo.integrantes.join(", ")}`,
      tipo: nuevoGrupo.tipo,
    };
    
    // Enviar nuevoGrupoObj a la base de datos
    try {
      await fetch("URL_DE_TU_API/crear-grupo", { // la base de datos
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    // Dentro del return de Grupos
<div className="grupos">
  <Header />
  <h1 className="titulo">Grupos a los que perteneces</h1>

  {/* Botón para crear nuevo grupo */}
  <button onClick={abrirModal} className="crear-grupo-btn">
    Crear Nuevo Grupo
  </button>

  {/* Modal */}
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
        <div>
          <input
            type="text"
            placeholder="Agregar integrante"
            value={integranteInput}
            onChange={(e) => setIntegranteInput(e.target.value)}
          />
          <button onClick={agregarIntegrante}>Agregar Integrante</button>
        </div>
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

  {/* Contenedor de los encabezados y listas de grupos */}
  <div className="grupo-categorias">
    {/* Grupos personales */}
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
                {grupo.title}
              </div>
            </div>
          ))}
      </div>
    )}

    {/* Grupos académicos */}
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
                {grupo.title}
              </div>
            </div>
          ))}
      </div>
    )}
  </div>
</div>

  );
}

export default Grupos;

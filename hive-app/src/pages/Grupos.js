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

  localStorage.setItem('group', "");

  // Función para cargar los grupos desde la base de datos
  const fetchGrupos = async () => {
    localStorage.setItem('group', "");
    const username = "alejandrocald13";
    const response = await fetch('http://localhost:3001/api/fetch-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      const formattedGroups = data.map(grupo => ({
        ...grupo,
        tipo: grupo.type === 0 ? "Personal" : "Académico",
      }));
      setGrupos(formattedGroups);
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
    
    let userId = localStorage.getItem("userId");
    const fechaCreacion = new Date().toISOString(); 
    
    userId = "alejandrocald13";

    const nuevoGrupoObj = {
      title: nuevoGrupo.title,
      tipo: nuevoGrupo.tipo,
      fechaCreacion: fechaCreacion,
      userId: userId,
    };
    
    try {
      const response = await fetch("http://localhost:3001/api/registerGroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGrupoObj),
      });

      if (response.ok) {
        alert('Grupo registrado con éxito');
      } else {
        alert('Error al registrar el grupo.');
      }

      cerrarModal(); 
      fetchGrupos();

    } catch (error) {
      console.error("Error al agregar el grupo:", error);
    }
  };

  const handleNavigate = (id, nombre) => {
    console.log(nombre)
    // localStorage.setItem('group', codigo unico del grupo)
    navigate(`/grupo`); // Cambia la ruta a la que necesitas redirigir
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index); 
  };

  return (
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
                  <div className="grupo-title" onClick={() => handleNavigate(grupo.id, grupo)}>
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
                  <div className="grupo-title" onClick={() => handleNavigate(grupo.id, grupo)}>
                    {grupo.groupName}
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
import "../styles/Calendario.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

function Calendario() {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ type: "all", group: "all" });

    const idUser =  localStorage.getItem('user');
    // Cuando ya jale se integra lo siguiente: 
    const fetchEvents = async (event) => {
        const response = await fetch('http://localhost:3001/api/fetchEvents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser}),
        });

        if (response.ok) {
            const data = await response.json()
            console.log("Eventos Calendario")

            console.log(data)
            setEvents([...data]); // [data] es un array de diccionarios y ... le quita el array y ya solo quedan los diccionarios
        } else {
            alert('Error al obtener eventos');
        }
    }

    const fetchGroups = async (event) => {
        const response = await fetch('http://localhost:3001/api/fetchGroupsCalendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser}),
        });

        if (response.ok) {
            const data = await response.json()
            console.log("EGruposCalendario")

            console.log(data)

            // Aqui se insertas los grupos

        } else {
            alert('Error al obtener Grupos');
        }
    }

    useEffect(() => {
        fetchEvents();
        fetchGroups();
    }, []);

    const handleFilterChange = (type, group) => {
        setFilters({ type, group });
    };

    // Filtrar eventos según los filtros seleccionados
    const filteredEvents = events.filter(event => {
        const matchesType = filters.type === "all" || event.type === filters.type;
        const matchesGroup = filters.group === "all" || event.group === filters.group;
        return matchesType && matchesGroup;
    });

    return (
        <div className="calendario">
            <Header />
            <h1 className="titulo">Calendario</h1>

            {/* Filtros */}
            <div className="filters">
                <label htmlFor="typeFilter">Filtrar por tipo de grupo:</label>
                <select
                    id="typeFilter"
                    value={filters.type}
                    onChange={(e) => handleFilterChange(e.target.value, filters.group)}
                >
                    <option value="all">Todos</option>
                    <option value="academic">Académico</option>
                    <option value="personal">Personal</option>
                </select>

                <label htmlFor="groupFilter">Filtrar por grupo:</label>
                
            </div>

            {/* Lista de eventos con el nuevo diseño */}
            <div className="events-container">
                {filteredEvents.map((event, index) => (
                    <div key={index} className="event-item">
                        <div className="event-date">
                            <span>{new Date(event.date).getDate()}</span>
                            <span>{new Date(event.date).toLocaleString('default', { month: 'long' })}</span>
                        </div>
                        <div className="event-details">
                            <div className="event-header">
                                <strong>{event.name}</strong> {/* Nombre del evento */}
                                <span>{event.type === "academic" ? "Académico" : "Personal"}</span>
                            </div>
                            <div className="event-description">
                                {event.description}
                            </div>
                        </div>
                    </div>
                ))}
                {filteredEvents.length === 0 && <p>No hay eventos disponibles.</p>}
            </div>
        </div>
    );
}

export default Calendario;

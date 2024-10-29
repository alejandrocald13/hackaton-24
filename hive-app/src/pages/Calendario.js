import "../styles/Calendario.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

function Calendario() {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ type: "all", group: "all" });

    // Obtener eventos de la base de datos
    // useEffect(() => {
    //     axios.get("/api/events") // Cambia esta URL a tu endpoint real
    //         .then(response => setEvents(response.data))
    //         .catch(error => console.error("Error fetching events:", error));
    // }, []);

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

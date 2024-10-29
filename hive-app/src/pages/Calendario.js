import "../styles/Calendario.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

function Calendario() {
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filters, setFilters] = useState({ type: "all", group: "all" });

    const idUser = localStorage.getItem("user");

    const fetchEvents = async () => {
        const response = await fetch("http://localhost:3001/api/fetchEvents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idUser }),
        });

        if (response.ok) {
            const data = await response.json();
            setEvents([...data]);
        } else {
            alert("Error al obtener eventos");
        }
    };

    const fetchGroups = async () => {
        const response = await fetch("http://localhost:3001/api/fetchGroupsCalendar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idUser }),
        });

        if (response.ok) {
            const data = await response.json();
            setGroups(data);
        } else {
            alert("Error al obtener Grupos");
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchGroups();
    }, []);

    const handleTypeChange = (type) => {
        setFilters({
            type: type !== undefined ? String(type) : "all",
            group: "all",  // Restablecemos el grupo a "Todos"
        });
    };

    const handleGroupChange = (group) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            group: group !== undefined ? String(group) : "all",
        }));
    };

    const filteredEvents = events.filter((event) => {
        const matchesType = filters.type === "all" || event.type === Number(filters.type);
        const matchesGroup = filters.group === "all" || event.idGroup === filters.group;
        return matchesType && matchesGroup;
    });

    const filteredGroups = filters.type === "all"
        ? groups
        : groups.filter((group) => group.type === Number(filters.type));

    return (
        <div className="calendario">
            <Header />
            <h1 className="titulo">Calendario</h1>

            {/* Filtros */}
            <div className="filters">
                <label htmlFor="typeFilter">Filtrar por tipo de evento:</label>
                <select
                    id="typeFilter"
                    value={filters.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="1">Académico</option>
                    <option value="0">Personal</option>
                </select>

                {/* Mostrar el filtro de grupos solo si se selecciona "Todos" */}
                {filters.type === "all" && (
                    <>
                        <label htmlFor="groupFilter">Filtrar por grupo:</label>
                        <select
                            id="groupFilter"
                            value={filters.group}
                            onChange={(e) => handleGroupChange(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            {filteredGroups.map((group, index) => (
                                <option key={index} value={String(group.idGroup)}>
                                    {group.groupName}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            {/* Lista de eventos */}
            <div className="events-container">
                {filteredEvents.map((event, index) => (
                    <div key={index} className="event-item">
                        <div className="event-date">
                            <span>
                                {event.expiredDate ? new Date(event.expiredDate).getDate() : "N/A"}
                            </span>
                            <span>
                                {event.expiredDate ? new Date(event.expiredDate).toLocaleString("default", { month: "long" }) : "N/A"}
                            </span>
                        </div>
                        <div className="event-details">
                            <div className="event-header">
                                <strong>{event.title}</strong>
                                <span>{event.type === 1 ? "Académico" : "Personal"}</span>
                            </div>
                            <div className="event-description">{event.information}</div>
                            <div className="event-group">Grupo: {event.groupName}</div>
                        </div>
                    </div>
                ))}
                {filteredEvents.length === 0 && <p>No hay eventos disponibles.</p>}
            </div>
        </div>
    );
}

export default Calendario;

import "../styles/Calendario.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

function Calendario() {
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filters, setFilters] = useState({ type: "all", group: "all" });
    const [selectedDate, setSelectedDate] = useState(null);
    const [month, setMonth] = useState(9); // Octubre (0-11)
    const [year, setYear] = useState(2024);

    const idUser = localStorage.getItem("user");

    const fetchEvents = async () => {
        const response = await fetch("http://localhost:3001/api/fetchEvents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idUser }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Eventos:", data);
            setEvents(data.map(event => ({
                ...event,
                type: String(event.type), // Asegúrate de que el tipo sea una cadena
            })));
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
            console.log("Grupos:", data);
            setGroups(data);
        } else {
            alert("Error al obtener grupos");
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchGroups();
    }, []);

    const handleTypeChange = (type) => {
        setFilters({
            type: type !== undefined ? String(type) : "all",
            group: "all",  // Restablecer grupo a "Todos"
        });
    };

    const handleGroupChange = (group) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            group: group !== undefined ? String(group) : "all",
        }));
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    // Filtrar eventos según los filtros seleccionados
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.expiredDate);
        const isInCurrentMonth = eventDate.getMonth() === month && eventDate.getFullYear() === year;

        const matchesType = filters.type === "all" || event.type === filters.type; // Asegurarse de que se compara correctamente
        const matchesGroup = filters.group === "all" || event.idGroup === filters.group;

        return isInCurrentMonth && matchesType && matchesGroup;
    });

    // Filtrar grupos según el tipo seleccionado
    const filteredGroups = () => {
        if (filters.type === "all") {
            return groups; // Mostrar todos los grupos
        }
        return groups.filter(group => {
            return (filters.type === "1" && group.type === "academic") || (filters.type === "0" && group.type === "personal");
        });
    };

    return (
        <div className="calendario">
            <Header />
            <h1 className="titulo">Calendario</h1>

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

                {filters.type === "all" && (
                    <>
                        <label htmlFor="groupFilter">Filtrar por grupo:</label>
                        <select
                            id="groupFilter"
                            value={filters.group}
                            onChange={(e) => handleGroupChange(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            {filteredGroups().map((group, index) => (
                                <option key={index} value={String(group.idGroup)}>
                                    {group.groupName}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            <div className="main-container">
                <div className="calendar-container">
                    <div className="calendar-navigation">
                        <button className="nav-button" onClick={previousMonth}>Anterior</button>
                        <span className="month-year">{`${new Date(year, month).toLocaleString("es-ES", { month: "long" })} de ${year}`}</span>
                        <button className="nav-button" onClick={nextMonth}>Siguiente</button>
                    </div>

                    <div className="weekdays">
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className="weekday">{day}</div>
                        ))}
                    </div>

                    <div className="calendar">
                        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                            <div key={index} className="calendar-day empty"></div>
                        ))}
                        {[...Array(daysInMonth)].map((_, day) => {
                            const currentDay = day + 1;
                            const dayEvents = filteredEvents.filter(event =>
                                new Date(event.expiredDate).getDate() === currentDay
                            );

                            return (
                                <div
                                    key={currentDay}
                                    className={`calendar-day ${dayEvents.length > 0 ? "event-day" : ""}`}
                                    onClick={() => setSelectedDate(currentDay)}
                                >
                                    <span>{currentDay}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="event-details">
                    <h2>Detalles de eventos</h2>
                    {selectedDate && (
                        filteredEvents
                            .filter(event => 
                                new Date(event.expiredDate).getDate() === selectedDate
                            )
                            .map((event, index) => (
                                <div key={index} className="event-detail-item">
                                    <strong>{`${event.groupName} / ${event.type === "1" ? "Académico" : "Personal"}`}</strong><br />
                                    {event.title} - {event.information}
                                </div>
                            ))
                    )}
                    {selectedDate && filteredEvents.filter(event => 
                        new Date(event.expiredDate).getDate() === selectedDate
                    ).length === 0 && (
                        <p>No hay eventos para este día.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Calendario;

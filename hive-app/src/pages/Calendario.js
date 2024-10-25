import React, { useState, useEffect } from 'react';
import "../styles/Calendario.css";

function Calendario() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [filters, setFilters] = useState({ type: 'all', group: 'all' });
    const [groups, setGroups] = useState([]);

    // Grupos de ejemplo
    const academicGroups = [
        { id: 'group1', name: 'Grupo Académico 1' },
        { id: 'group2', name: 'Grupo Académico 2' }
    ];

    const personalGroups = [
        { id: 'group3', name: 'Grupo Personal 1' },
        { id: 'group4', name: 'Grupo Personal 2' }, 
        { id: 'Familia', name: 'Familia' }
    ];

    // **Eventos de ejemplo**
    const exampleEvents = [
        { id: 1, titulo: 'Examen Matemáticas', descripcion: 'Examen final de Matemáticas', fecha: '2024-10-25', tipo: 'academic', grupo: 'group1' },
        { id: 2, titulo: 'Reunión de Proyecto', descripcion: 'Reunión con el equipo', fecha: '2024-10-26', tipo: 'academic', grupo: 'group2' },
        { id: 3, titulo: 'Cumpleaños de Amigo', descripcion: 'Fiesta de cumpleaños', fecha: '2024-10-27', tipo: 'personal', grupo: 'group3' },
        { id: 4, titulo: 'Clase de Inglés', descripcion: 'Lección semanal de inglés', fecha: '2024-10-28', tipo: 'academic', grupo: 'group1' },
        { id: 5, titulo: 'Cena Familiar', descripcion: 'Cena con la familia', fecha: '2024-10-29', tipo: 'personal', grupo: 'group4' },
        { id: 6, titulo: 'Tarea', descripcion: 'Tarea', fecha: '2024-06-03', tipo: 'academic', grupo: 'group1' },
        { id: 7, titulo: 'Salida', descripcion: 'Salida de descanso', fecha: '2024-12-24', tipo: 'personal', grupo: 'Familia' }
    ];

    // Cargar eventos de ejemplo al iniciar el componente
    useEffect(() => {
        setEvents(exampleEvents);
    }, []);

    // Filtrar eventos según el mes y los filtros
    useEffect(() => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(),  1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const filtered = events.filter(event => {
            const eventDate = new Date(event.fecha);
            const isSameMonth = eventDate >= startOfMonth && eventDate <= endOfMonth;
            
            // Filtrar por tipo y grupo
            const matchType = filters.type === 'all' || filters.type === event.tipo;
            const matchGroup = filters.group === 'all' || filters.group === event.grupo;

            return isSameMonth && matchType && matchGroup;
        });

        setFilteredEvents(filtered);
    }, [currentDate, events, filters]);

    // Cambiar mes
    const handleChangeMonth = (direction) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
        setCurrentDate(newDate);
    };

    // Mostrar eventos del día seleccionado
    const handleDayClick = (day) => {
        const dayEvents = filteredEvents.filter(event => new Date(event.fecha).getDate() + 1 === day);
        setSelectedDayEvents(dayEvents);
    };

    // Actualizar grupos según el tipo seleccionado
    useEffect(() => {
        if (filters.type === 'academic') {
            setGroups(academicGroups);
        } else if (filters.type === 'personal') {
            setGroups(personalGroups);
        } else {
            setGroups([...academicGroups, ...personalGroups]);
        }
    }, [filters.type]);

    // Manejar cambios en los filtros
    const handleFilterChange = (type, group) => {
        setFilters({ type, group });
    };

    // Verificar si hay eventos en un día específico
    const hasEvents = (day) => {
        return filteredEvents.some(event => new Date(event.fecha).getDate() + 1 === day);
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return (
        <div className="calendario">
            <h1 className="titulo">Calendario</h1>
            
            {/* Filtros */}
            <div className="filters">
                <label htmlFor="typeFilter">Filtrar por tipo de grupo:</label>
                <select id="typeFilter" value={filters.type} onChange={(e) => handleFilterChange(e.target.value, filters.group)}>
                    <option value="all">Todos</option>
                    <option value="academic">Académico</option>
                    <option value="personal">Personal</option>
                </select>

                <label htmlFor="groupFilter">Filtrar por grupo:</label>
                <select id="groupFilter" value={filters.group} onChange={(e) => handleFilterChange(filters.type, e.target.value)}>
                    <option value="all">Todos los grupos</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </div>

            {/* Contenedor del calendario y eventos */}
            <div className="main-container">
                {/* Calendario */}
                <div className="calendar-container">
                    <div className="calendar-navigation">
                        <button onClick={() => handleChangeMonth(-1)}>Anterior</button>
                        <span>{capitalizedMonthName}</span>
                        <button onClick={() => handleChangeMonth(1)}>Siguiente</button>
                    </div>
                    <div className="calendar">
                        {[...Array(daysInMonth)].map((_, day) => {
                            const dayNumber = day + 1;
                            return (
                                <div
                                    key={dayNumber}
                                    className={`calendar-day ${hasEvents(dayNumber) ? 'event-day' : ''}`}
                                    onClick={() => handleDayClick(dayNumber)}
                                >
                                    {dayNumber}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detalles de eventos */}
                <div className="event-details">
                    <h2>Detalles de eventos</h2>
                    <ul>
                        {selectedDayEvents.length > 0 ? (
                            selectedDayEvents.map((event, index) => (
                                <li key={index}>
                                    {event.titulo} - {event.descripcion}
                                </li>
                            ))
                        ) : (
                            <li>No hay eventos para esta fecha.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Calendario;

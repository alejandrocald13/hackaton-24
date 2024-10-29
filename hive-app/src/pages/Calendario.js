import React, { useState, useEffect } from 'react';
import "../styles/Calendario.css";

function Calendario() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [filters, setFilters] = useState({ type: 'all', group: 'all' });
    const [groups, setGroups] = useState([]);
    const [showMessage, setShowMessage] = useState(false); // Estado para el mensaje de formato


    // Cuando ya jale se integra lo siguiente: 
    /*const fetchEvents = async (event) => {
        const response = await fetch('http://localhost:3001/api/fetchEvents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idUser}),
        });

        if (response.ok) {
            const data = await response.json()
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
            // Filtrar grupos en base al campo type
            const academicGroups = data.filter(group => group.type === 1);
            const personalGroups = data.filter(group => group.type === 0);

            // Actualizar los estados
            // Esto lo mande así porque si no al inicio no tiene grupos
            setGroups([...data])
            // Grupos separados
            setAcademicGroups(academicGroups);
            setPersonalGroups(personalGroups);

        } else {
            
        }
    }

    useEffect(() => {
        fetchEvents();
        fetchGroups();
    }, []);*/
    const academicGroups = [
        { id: 'group1', name: 'Grupo Académico 1' },
        { id: 'group2', name: 'Grupo Académico 2' }
    ];

    const personalGroups = [
        { id: 'group3', name: 'Grupo Personal 1' },
        { id: 'group4', name: 'Grupo Personal 2' }, 
        { id: 'group5', name: 'Familia' }
    ];

    const exampleEvents = [
        { id: 1, titulo: 'Examen Matemáticas', descripcion: 'Examen final de Matemáticas', fecha: '2024-10-25', tipo: 'academic', grupo: 'group1' },
        { id: 2, titulo: 'Reunión de Proyecto', descripcion: 'Reunión con el equipo', fecha: '2024-10-26', tipo: 'academic', grupo: 'group2' },
        { id: 3, titulo: 'Cumpleaños de Amigo', descripcion: 'Fiesta de cumpleaños', fecha: '2024-10-27', tipo: 'personal', grupo: 'group3' },
        { id: 4, titulo: 'Clase de Inglés', descripcion: 'Lección semanal de inglés', fecha: '2024-10-28', tipo: 'academic', grupo: 'group1' },
        { id: 5, titulo: 'Cena Familiar', descripcion: 'Cena con la familia', fecha: '2024-10-29', tipo: 'personal', grupo: 'group4' },
        { id: 6, titulo: 'Tarea', descripcion: 'Tarea', fecha: '2024-06-03', tipo: 'academic', grupo: 'group1' },
        { id: 7, titulo: 'Salida', descripcion: 'Salida de descanso', fecha: '2024-12-24', tipo: 'personal', grupo: 'group5' },
        { id: 8, titulo: 'Examen Lenguaje', descripcion: 'Examen parcial de Lenguaje', fecha: '2024-10-25', tipo: 'academic', grupo: 'group2' },
        { id: 9, titulo: 'Salida', descripcion: 'Salida de descanso', fecha: '2024-10-25', tipo: 'personal', grupo: 'group5' },
    ];

    useEffect(() => {
        setEvents(exampleEvents);
    }, []);

    useEffect(() => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const filtered = events.filter(event => {
            const eventDate = new Date(event.fecha);
            const isSameMonth = eventDate >= startOfMonth && eventDate <= endOfMonth;
            const matchType = filters.type === 'all' || filters.type === event.tipo;
            const matchGroup = filters.group === 'all' || filters.group === event.grupo;

            return isSameMonth && matchType && matchGroup;
        });

        setFilteredEvents(filtered);
    }, [currentDate, events, filters]);

    const handleChangeMonth = (direction) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
        setCurrentDate(newDate);
    };

    const handleDayClick = (day) => {
        const dayEvents = filteredEvents.filter(event => new Date(event.fecha).getDate() + 1 === day);
        setSelectedDayEvents(dayEvents);
    };

    useEffect(() => {
        if (filters.type === 'academic') {
            setGroups(academicGroups);
        } else if (filters.type === 'personal') {
            setGroups(personalGroups);
        } else {
            setGroups([...academicGroups, ...personalGroups]);
        }
    }, [filters.type]);

    const handleFilterChange = (type, group) => {
        setFilters({ type, group });
    };

    const hasEvents = (day) => {
        return filteredEvents.some(event => new Date(event.fecha).getDate() + 1 === day);
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth + firstDayOfMonth }, (_, index) => {
        return index < firstDayOfMonth ? null : index - firstDayOfMonth + 1;
    });

    const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];

    // Controla la visibilidad del mensaje según el tamaño de la pantalla
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
            <div className="calendario">
                <h1 className="titulo">Calendario</h1>
                
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

                <div className="main-container">
                    <div className="calendar-container">
                        <div className="calendar-navigation">
                            <button onClick={() => handleChangeMonth(-1)}>Anterior</button>
                            <span>{capitalizedMonthName}</span>
                            <button onClick={() => handleChangeMonth(1)}>Siguiente</button>
                        </div>

                        <div className="weekdays">
                            {weekDays.map((day, index) => (
                                <div key={index} className="weekday">{day}</div>
                            ))}
                        </div>

                        <div className="calendar">
                            {daysArray.map((day, index) => (
                                <div
                                    key={index}
                                    className={`calendar-day ${day ? (hasEvents(day) ? 'event-day' : '') : 'empty-day'}`}
                                    onClick={() => day && handleDayClick(day)}
                                >
                                    {day || ''}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="event-details">
                        <h2>Detalles de eventos</h2>
                        <ul>
                            {selectedDayEvents.length > 0 ? (
                                selectedDayEvents.map((event, index) => {
                                    // Encuentra el nombre del grupo correspondiente al evento
                                    const groupName = groups.find(group => group.id === event.grupo)?.name || '';
                                    const eventType = event.tipo === 'academic' ? 'Académico' : 'Personal'; // Determina el tipo de evento
                                    return (
                                        <li key={index}>
                                            <div className="event-header">
                                                <strong>{groupName} / {eventType}</strong>
                                            </div>
                                            <div>{event.titulo} - {event.descripcion}</div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li>No hay eventos para esta fecha.</li>
                            )}
                        </ul>
                    </div>
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

export default Calendario;
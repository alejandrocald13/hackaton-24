import "../styles/Nota.css"

function Nota ({description, dia, mesNombre_anio, onDelete}) {
    return (
        <div className="nota">
            <button className="delete-note-btn" onClick={onDelete}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg></button>

            <p className="nota-description">
                "{description}"
            </p>
            <div className="date-details">
                <p className="day">{dia}</p>
                <p className="month">{mesNombre_anio}</p>
            </div>
            </div>
    )
}

export default Nota

import "../styles/Nota.css"

function Nota ({description, dia, mesNombre_anio}) {
    return (
        <div className="nota">
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

import "../styles/Principal.css"
import Tarjeta from "../components/Tarjeta"
import Header from "../components/Header"


function Principal() {

    return (
        <div className="principal">
            <Header/>
            <div className="display_tarjetas">
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>

                <Tarjeta/><Tarjeta/>

            </div>
            <ul>
                <a href="/grupo"><li>Un grupo en especifico</li></a>
                <a href="/grupos-generales"><li>Todos los grupos</li></a>
                <a href="/calendario"><li>Calendario</li></a>
                <a href="/miembros"><li>Miembros</li></a>
            </ul>
        </div>
        
    )
}

export default Principal
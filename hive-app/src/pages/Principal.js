import "../styles/Principal.css"
import Nav from "../components/Nav"
import Tarjeta from "../components/Tarjeta"
import Header from "../components/Header"


function Principal() {

    const abrir = ()=> {
        const nav = document.querySelector("nav")
        nav.style.display = "block"
    }

    return (
        <div className="principal">
            <Nav/>
            <Header/>
            <div className="display_tarjetas">
                <Tarjeta/>
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
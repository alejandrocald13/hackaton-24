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
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>
                <Tarjeta/>

                <Tarjeta/><Tarjeta/>

            </div>
        </div>
        
    )
}

export default Principal
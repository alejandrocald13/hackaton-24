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
        </div>
        
    )
}

export default Principal
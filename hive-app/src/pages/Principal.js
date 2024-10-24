import "../styles/Principal.css"
import Nav from "../components/Nav"


function Principal() {

    const abrir = ()=> {
        const nav = document.querySelector("nav")
        nav.style.display = "block"
    }

    return (
        <div className="principal">
            <Nav/>
            <div className="top">
                <h1 className="titulo">Hive</h1>
                <button className="menu" onClick={abrir}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg></button>
            </div>
            <ul>
                <a href="/grupo"><li>Un grupo en especifico</li></a>
                <a href="/grupos-generales"><li>Todos los grupos</li></a>
                <a href="/calendario"><li>Calendario</li></a>
                <a href="/notas"><li>Notas</li></a>
            </ul>
        </div>
        
    )
}

export default Principal
import { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Tarjeta from "../components/Tarjeta";
import "../styles/SingleGroup.css";

function SingleGroup() {
    // Estado para controlar la visibilidad del elemento con el ID
    const [showId, setShowId] = useState(false);

    // Función para alternar la visibilidad
    const toggleIdVisibility = () => {
        setShowId(!showId);
    };

    return (
        <div className="sigle_group">
            <Nav />
            <Header />
            <div className="info_grupo">
                <h1 className="titulo">Página por Grupo</h1>
                <ul className="info">
                    <li>
                        <button className="id_grupo" onClick={toggleIdVisibility}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M14 14.252V22H4a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm6 4v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path></g></svg></button>
                    </li>
                    <li>
                        <button>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </li>
                    <li><button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zM4 9v10h16V9H4zm2 4h5v4H6v-4z"></path></g></svg></button></li>
                    {/* Mostrar o esconder el <li> con el id */}
                    {showId && <li className="id">5454</li>}
                </ul>
            </div>
            <Tarjeta />
        </div>
    );
}

export default SingleGroup;

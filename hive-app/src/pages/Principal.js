import "../styles/Principal.css";
import Tarjeta from "../components/Tarjeta";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function Principal() {
  const [username, setUsername] = useState('');

  
/* const getEvents = async () => {
        const username = "alejandrocald13";
        const response = await fetch('http://localhost:3001/api/fetch-groups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const formattedGroups = data.map(grupo => ({
            ...grupo,
            tipo: grupo.type === 0 ? "Personal" : "Académico",
          }));
          setGrupos(formattedGroups);
        }
    };*/

      // const getNotes // mayda xd

  useEffect(() => {
    // Obtener el username de localStorage al cargar la página principal
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="principal">
      <Header/>
      <h2>Bienvenido, {username}</h2>
      <div className="display_tarjetas">
        <Tarjeta />
        <Tarjeta />
      </div>
    </div>
  );
}

export default Principal;

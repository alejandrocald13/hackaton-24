import "../styles/Principal.css"
import Tarjeta from "../components/Tarjeta"
import Header from "../components/Header"


function Principal() {

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
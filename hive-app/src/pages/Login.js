import "../styles/Login.css"
import { useEffect, useState } from 'react';


const llenar = async () => {
  const notedata1 = {
    idUser: "DANI",
    information: "Hola primera nota",
    confirmatedDate: "24/10/24"
  };

  

  // Lógica para el registro
  try{
    const response3 = await fetch('http://localhost:3001/api/insertNote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notedata1),
    });
  
    if (response3.ok) {
      alert('NOTA registrado con éxito');
    } 

  } catch(error){
    console.error(error);
  }

  const notedata2 = {
    idUser: "PEPITO",
    information: "Hola primera nota",
    confirmatedDate: "24/10/24"
  };


  // Lógica para el registro
  const response4 = await fetch('http://localhost:3001/api/insertNote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notedata2),
  });

  if (response4.ok) {
    alert('NOTA registrado con éxito');
  } else {
    alert('Error al registrar el NOTA');
  }


};






function Login() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
      const boton = document.getElementById("insert");
      boton.addEventListener('click', handleSubmit);
        
        // Limpiar el evento cuando el componente se desmonte
        return () => {
            boton.removeEventListener('click', handleSubmit);
        }
    });

    const handleSubmit = async (event) => {
      event.preventDefault(); // Evita el envío por defecto del formulario
      // Llamar a la función
      llenar()
      // Acudir solo notas de ususario
      const idUser = "DANI"
      const response = await fetch('http://localhost:3001/api/getNotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idUser})
      });
      if (response.ok) {
        // convierte la data en un json con {idUser, idGroup, groupName, createdDate, type (0 - p, 1 - a), creatorUser}
        const data = await response.json();;
        console.log(data);
      }
  };
    return (
      <div className="login">
        <div className="elementos_registro">
          <h1 className="titulo">Login</h1>
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="username">Usuario:</label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                />
              </li>
              <li>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                />
              </li>
            </ul>
            <button type="submit"id="insert">Ingresar</button>
            <a href="/principal">momentaneo</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
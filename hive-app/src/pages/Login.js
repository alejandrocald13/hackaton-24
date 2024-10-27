import "../styles/Login.css"
import { useEffect, useState } from 'react';


const fetchData = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/getnotes'); // Cambia el URL por el de tu API

      // Comprobar si la respuesta fue exitosa
      if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
      }

      const data = await response.json(); // Convertir la respuesta a JSON
      console.log(data); // Hacer algo con los datos
  } catch (error) {
      console.error('Error:', error); // Manejo de errores
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
      fetchData();
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
import '../main/login.ts';
import "../styles/Login.css"
import { useEffect, useState } from 'react';

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
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
    
      /*Crear el cuerpo de la solicitud (datos del usuario)
      const userData = {
        name: "PEPE",
        userName: "PEPITO",
        password: "1234",
        email: "pepe@gmail.com",
        image: "url_de_imagen",
      };
    
      // Hacer la solicitud POST al servidor Express
      fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          alert(data); // Muestra el mensaje del servidor
        })
        .catch((error) => {
          console.error("Error:", error);
        });*/


      const user = {
        userName: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };

      console.log(user)
      fetch("http://localhost:3001/api/login", {
  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          alert(data); // Muestra el mensaje del servidor
        })
        .catch((error) => {
          console.error("Error:", error);
        });

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
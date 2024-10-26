import "../styles/Login.css";
import { useState } from 'react';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      // Lógica para el registro
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, username, password, email }),
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
      } else {
        alert('Error al registrar el usuario');
      }
    } else {
      // Lógica para el inicio de sesión
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  };

  return (
    <div className="login">
      <div className="elementos_registro">
        <h1 className="titulo">{isRegistering ? 'Registro' : 'Login'}</h1>
        
        <form onSubmit={handleSubmit}>
          <ul>
            {isRegistering && (
              <>
                <li>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresa tu nombre"
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu email"
                  />
                </li>
              </>
            )}
            <li>
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                value={username}
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
          <button type="submit" className="button_ingresar">{isRegistering ? 'Registrar' : 'Ingresar'}</button>
          <button type="button" className="button_registrar" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

/* import "../styles/Login.css"
import { useEffect, useState } from 'react';

function Login() {
    let [userName, setUsername] = useState('');
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

      Crear el cuerpo de la solicitud (datos del usuario)
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
        });


      const user = {
        userName: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };

      setUsername('');
      setPassword('');

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
    </div>
  );
}

export default Login;*/

import '../main/login.ts';
import "../styles/Login.css"
import { useEffect, useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí puedes guardar los datos o hacer algo con ellos (como enviarlos a una API)
      console.log('Usuario:', username);
      console.log('Contraseña:', password);
    };

    
    useEffect(() => {
      const boton = document.getElementById("login");
      boton.addEventListener('click', handleLoginButton);
        
        // Limpiar el evento cuando el componente se desmonte
        return () => {
            boton.removeEventListener('click', handleLoginButton);
        }
    }, []);

    const handleLoginButton = () => {

      alert('has presionado a Messi')
    
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
            <button type="submit" id = "login" >Ingresar</button>
            <a href="/principal">momentaneo</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
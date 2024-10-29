import express from "express";
import bodyParser from "body-parser";
import { Table } from "./api.js"; // Importa la función de inserción
import cors from 'cors';

// Accedemos a los métodos de la base de dtaos
const table = new Table();

// Creando Framework
const app = express();
const port = 3001; // Puerto para el servidor

// Union de puertos diferente
app.use(cors());
// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// AQUI MANEJAMOS LAS ACCIONES QUE SE REALIZARAN EN LA BASE DE DATOS
// Ruta para inserción de usuarios (/register)
app.post("/api/register", async (req, res) => {
  const { name, username, password, email, image } = req.body;
  try {

    await table.insertUser(name, username, password, email, image);
    res.status(200).send("Usuario registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el usuario");
  }
});

// Ruta para validar (/login)
app.post("/api/login", async (req, res) => {
  const { username, password} = req.body;
  try {

    const respuesta = await table.validateUser(username, password);
    if (!respuesta){
      throw new Error()
    }

    localStorage.setItem('username', username);

    res.status(200).send("Usuario encontrado");
  } catch (error) {
    res.status(500).send("El usuario no fue encontrado");
  }
});

// Ruta para obtener Eventos
app.post("/api/fetchEvents", async (req, res) => {
  const { idUser } = req.body;
  try {
    const result = await table.fetchEvent(idUser);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("No se pudieron obtener las notas");
  }
});

// Ruta para obtener grupos en calendario
app.post("/api/fetchGroupsCalendar", async (req, res) => {
  const { idUser } = req.body;
  try {
    console.log(idUser)
    const result = await table.fetchGroupCalendar(idUser);
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("No se pudieron obtener las notas");
  }
});

// ROBERTO CALDERON
// Ruta para sacar los grupos 
app.post("/api/fetch-groups", async (req, res) => {
  const { username} = req.body;

  const result = await table.fetchGroups(username);
  res.json(result);
    
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

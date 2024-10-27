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
  const {name, userName, password, email, iv} = req.body;
  try {
    await table.insertUser(name, userName, password, email, iv);
    res.status(200).send("Usuario registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el usuario");
  }
});

// Ruta para validar (/login)
app.post("/api/login", async (req, res) => {
  const { userName, password} = req.body;
  try {
    const respuesta = await table.validateUser(userName, password);
    if (!respuesta){
      throw new Error()
    }
    res.status(200).send("Usuario encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).send("El usuario no fue encontrado");
  }
});

// Ruta para insertar notas

app.post("/api/insertNote", async (req, res) => {
  const {idUser, information, confirmatedDate} = req.body;
  try {
    await table.insertNote(idUser, information, confirmatedDate);
    res.status(200).send("Nota insertada conrrectamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Nota no insertada");
  }
});

// Ruta para obtener data
app.post("/api/getNotes", async (req, res) => {
  const { idUser } = req.body;
  try {
    console.log(idUser)
    const result = await table.getNotes(idUser);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("No se pudieron obtener las notas");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de tener un archivo de configuración de SQLite
const bcrypt = require('bcrypt');

// Ruta para obtener todas las tarjetas
router.get('/tarjetas', (req, res) => {
    db.all('SELECT * FROM tarjetas', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Ruta para obtener tarjetas de un grupo específico
router.get('/tarjetas/:grupoId', (req, res) => {
    const { grupoId } = req.params;
    db.all('SELECT * FROM tarjetas WHERE grupo_id = ?', [grupoId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
    const { nombre, username, password, email } = req.body;

    // Encriptar la contraseña antes de almacenarla
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error en el hash de la contraseña');

        db.run(`INSERT INTO usuarios (nombre, username, password, email) VALUES (?, ?, ?, ?)`,
            [nombre, username, hash, email], function (error) {
                if (error) {
                    return res.status(500).send('Error al registrar el usuario');
                }
                res.status(201).send('Usuario registrado con éxito');
            });
    });
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM usuarios WHERE username = ?`, [username], (err, row) => {
        if (err) return res.status(500).send('Error al buscar el usuario');
        if (!row) return res.status(401).send('Usuario o contraseña incorrectos');

        // Comparar la contraseña ingresada con la almacenada
        bcrypt.compare(password, row.password, (err, result) => {
            if (result) {
                res.send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Usuario o contraseña incorrectos');
            }
        });
    });
});

module.exports = router;

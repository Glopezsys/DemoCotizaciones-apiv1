const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operaciones relacionadas con la autenticación
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *       500:
 *         description: Error del servidor
 */
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    userModel.createUser(username, password, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, username });
    });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userModel.findUserByUsername(username, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json(err);
            if (!isMatch) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

            const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

module.exports = router;

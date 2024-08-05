const express = require('express');
const router = express.Router();
const cotizacionModel = require('../models/cotizacion');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Cotizaciones
 *   description: Operaciones relacionadas con cotizaciones
 */

/**
 * @swagger
 * /api/cotizaciones:
 *   get:
 *     summary: Obtiene todas las cotizaciones
 *     tags: [Cotizaciones]
 *     responses:
 *       200:
 *         description: Lista de cotizaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   cliente:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   monto:
 *                     type: number
 *                     format: float
 *                   fecha:
 *                     type: string
 *                     format: date
 */
router.get('/', authenticateToken, (req, res) => {
    cotizacionModel.getAllCotizaciones((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   get:
 *     summary: Obtiene una cotización por ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cotización
 *     responses:
 *       200:
 *         description: Cotización encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cliente:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 monto:
 *                   type: number
 *                   format: float
 *                 fecha:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Cotización no encontrada
 */
router.get('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    cotizacionModel.getCotizacionById(id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.json(result[0]);
    });
});

/**
 * @swagger
 * /api/cotizaciones:
 *   post:
 *     summary: Crea una nueva cotización
 *     tags: [Cotizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               monto:
 *                 type: number
 *                 format: float
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Cotización creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cliente:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 monto:
 *                   type: number
 *                   format: float
 *                 fecha:
 *                   type: string
 *                   format: date
 */
router.post('/', authenticateToken, (req, res) => {
    const newCotizacion = req.body;
    cotizacionModel.createCotizacion(newCotizacion, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...newCotizacion });
    });
});

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   put:
 *     summary: Actualiza una cotización
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cotización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               monto:
 *                 type: number
 *                 format: float
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Cotización actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cliente:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 monto:
 *                   type: number
 *                   format: float
 *                 fecha:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Cotización no encontrada
 */
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const updatedCotizacion = req.body;
    cotizacionModel.updateCotizacion(id, updatedCotizacion, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.json({ id, ...updatedCotizacion });
    });
});

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   delete:
 *     summary: Elimina una cotización
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cotización
 *     responses:
 *       204:
 *         description: Cotización eliminada
 *       404:
 *         description: Cotización no encontrada
 */
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    cotizacionModel.deleteCotizacion(id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.status(204).end();
    });
});

module.exports = router;

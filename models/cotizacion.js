const db = require('../config/db');

const getAllCotizaciones = (callback) => {
    db.query('SELECT * FROM cotizaciones', callback);
};

const getCotizacionById = (id, callback) => {
    db.query('SELECT * FROM cotizaciones WHERE id = ?', [id], callback);
};

const createCotizacion = (data, callback) => {
    db.query('INSERT INTO cotizaciones SET ?', data, callback);
};

const updateCotizacion = (id, data, callback) => {
    db.query('UPDATE cotizaciones SET ? WHERE id = ?', [data, id], callback);
};

const deleteCotizacion = (id, callback) => {
    db.query('DELETE FROM cotizaciones WHERE id = ?', [id], callback);
};

module.exports = { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion };

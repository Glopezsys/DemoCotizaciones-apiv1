const db = require('../config/db');
const bcrypt = require('bcryptjs');

const findUserByUsername = (username, callback) => {
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], callback);
};

const createUser = (username, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);
        db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword], callback);
    });
};

module.exports = { findUserByUsername, createUser };

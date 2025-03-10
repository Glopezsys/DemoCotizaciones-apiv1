const express = require('express');
const bodyParser = require('body-parser');
const cotizacionesRoutes = require('./routes/cotizaciones');
const authRoutes = require('./routes/auth');
const swaggerDocs = require('./swagger'); // Importa el archivo swagger.js
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/cotizaciones', cotizacionesRoutes);
app.use('/api/auth', authRoutes);

// Configura Swagger
swaggerDocs(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

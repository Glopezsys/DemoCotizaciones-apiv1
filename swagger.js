const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Cotizaciones',
        version: '1.0.0',
        description: 'API para gestionar cotizaciones',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
};

// Opciones de Swagger
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Ruta a los archivos donde se encuentran los comentarios de Swagger
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;

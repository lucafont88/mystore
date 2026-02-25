import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Auth Service',
      version: '1.0.0',
      description: 'Authentication and user management API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [{ name: 'Auth', description: 'Authentication endpoints' }],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export default swaggerJsdoc(options);

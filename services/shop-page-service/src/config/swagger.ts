import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Shop Page Service',
      version: '1.0.0',
      description: 'Shop page builder and management API',
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
    tags: [{ name: 'Shop Pages', description: 'Vendor shop page management' }],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export default swaggerJsdoc(options);

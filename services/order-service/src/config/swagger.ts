import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Order Service',
      version: '1.0.0',
      description: 'Order management API',
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
    tags: [{ name: 'Orders', description: 'Order management' }],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export default swaggerJsdoc(options);

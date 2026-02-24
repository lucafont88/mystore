import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Product Service',
      version: '1.0.0',
      description: 'Products, categories, digital products, and bundles API',
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
    tags: [
      { name: 'Products', description: 'Physical and digital products' },
      { name: 'Categories', description: 'Product categories' },
      { name: 'Digital Products', description: 'Digital product management (file, license, access)' },
      { name: 'License Keys', description: 'License key management for digital products' },
      { name: 'Bundles', description: 'Product bundles' },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export default swaggerJsdoc(options);

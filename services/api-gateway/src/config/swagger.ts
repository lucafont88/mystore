import { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

interface ServiceSpec {
  name: string;
  url: string;
}

const services: ServiceSpec[] = [
  { name: 'auth-service', url: `${process.env.AUTH_SERVICE_URL || 'http://localhost:3001'}/api/v1/docs.json` },
  { name: 'product-service', url: `${process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002'}/api/v1/docs.json` },
  { name: 'shop-page-service', url: `${process.env.SHOP_PAGE_SERVICE_URL || 'http://localhost:3003'}/api/v1/docs.json` },
  { name: 'order-service', url: `${process.env.ORDER_SERVICE_URL || 'http://localhost:3004'}/api/v1/docs.json` },
];

let mergedSpec: Record<string, any> = buildEmptySpec();

function buildEmptySpec() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'MyStore API',
      version: '1.0.0',
      description: 'Unified API documentation for all MyStore microservices',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {} as Record<string, any>,
    },
    paths: {},
    tags: [] as any[],
  };
}

async function fetchSpecWithRetry(url: string, retries = 3, delayMs = 2000): Promise<any | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  return null;
}

function mergeSpecs(specs: any[]): Record<string, any> {
  const merged = buildEmptySpec();

  for (const spec of specs) {
    if (!spec) continue;

    // Merge paths
    if (spec.paths) {
      Object.assign(merged.paths, spec.paths);
    }

    // Merge tags (deduplicate by name)
    if (spec.tags) {
      const existingNames = new Set(merged.tags.map((t: any) => t.name));
      for (const tag of spec.tags) {
        if (!existingNames.has(tag.name)) {
          merged.tags.push(tag);
          existingNames.add(tag.name);
        }
      }
    }

    // Merge component schemas
    if (spec.components?.schemas) {
      if (!merged.components.schemas) merged.components.schemas = {};
      Object.assign(merged.components.schemas, spec.components.schemas);
    }
  }

  return merged;
}

async function loadSpecs(): Promise<void> {
  const specs = await Promise.all(services.map((s) => fetchSpecWithRetry(s.url)));
  mergedSpec = mergeSpecs(specs);
}

function createBasicAuth(): (req: Request, res: Response, next: NextFunction) => void {
  const swaggerUser = process.env.SWAGGER_USER || 'admin';
  const swaggerPassword = process.env.SWAGGER_PASSWORD || 'admin';

  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger API Docs"');
      res.status(401).send('Authentication required');
      return;
    }
    const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    if (user === swaggerUser && pass === swaggerPassword) {
      next();
      return;
    }
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger API Docs"');
    res.status(401).send('Invalid credentials');
  };
}

export async function setupSwagger(app: Application): Promise<void> {
  // Load specs from services
  await loadSpecs();

  // Basic Auth protection for all /api-docs routes
  const basicAuth = createBasicAuth();
  app.use('/api-docs', basicAuth);

  // Serve merged spec as JSON
  app.get('/api-docs/spec.json', (_req, res) => res.json(mergedSpec));

  // Refresh endpoint to reload specs without restart
  app.get('/api-docs/refresh', async (_req, res) => {
    await loadSpecs();
    res.json({ message: 'Specs refreshed', tags: mergedSpec.tags?.length || 0, paths: Object.keys(mergedSpec.paths).length });
  });

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
    swaggerOptions: {
      url: '/api-docs/spec.json',
    },
  }));
}

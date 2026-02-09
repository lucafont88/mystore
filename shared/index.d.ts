declare module '@ecommerce/shared' {
  export function initObservability(serviceName: string): any;
  export const logger: any;
  export const metricsHandler: any;
  export const requestLogger: any;
  export const metricsMiddleware: any;
}

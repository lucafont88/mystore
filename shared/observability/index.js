const { initTracing } = require('./tracing');
const { logger } = require('./logger');
const { metricsHandler } = require('./metrics');
const { requestLogger } = require('./middlewares/requestLogger');
const { metricsMiddleware } = require('./middlewares/metricsMiddleware');

/**
 * Initializes the full observability stack for a service.
 * @param {string} serviceName - The name of the service (e.g., 'auth-service').
 * @returns {Object} - The observability components.
 */
function initObservability(serviceName) {
  process.env.SERVICE_NAME = serviceName;
  
  // Initialize tracing
  const sdk = initTracing(serviceName);

  return {
    logger,
    metricsHandler,
    middlewares: {
      requestLogger,
      metricsMiddleware,
    },
    sdk,
  };
}

module.exports = {
  initObservability,
  logger,
  metricsHandler,
  requestLogger,
  metricsMiddleware,
};

const { logger } = require('../logger');
const { v4: uuidv4 } = require('uuid');

const requestLogger = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);

  // Attach logger to request with context
  req.log = logger.child({ requestId });

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    req.log.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
    }, 'Request completed');
  });

  next();
};

module.exports = { requestLogger };

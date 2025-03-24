import { randomUUID } from 'crypto';

export const traceIdMiddleware = (req, res, next) => {
  const traceId = req.headers['x-trace-id'] || randomUUID();
  req.traceId = traceId;
  res.setHeader('x-trace-id', traceId);
  global.traceId = traceId;
  next();
};

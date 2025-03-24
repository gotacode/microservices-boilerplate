let requestCount = 0;

export const metricsMiddleware = (req, res, next) => {
  requestCount++;
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[METRICS] Total Requests: ${requestCount}`);
  }
  next();
};

export const audit = (req, res, next) => {
  const user = req.user || {};
  const info = {
    route: req.originalUrl,
    method: req.method,
    userId: user.sub || 'anonymous',
    ip: req.ip
  };
  console.log('[AUDIT]', JSON.stringify(info));
  next();
};

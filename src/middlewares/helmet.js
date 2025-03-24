import helmet from 'helmet';

export const helmetMiddleware = () => {
  const isProd = process.env.NODE_ENV === 'production';

  return helmet({
    contentSecurityPolicy: isProd ? undefined : false,
    crossOriginEmbedderPolicy: isProd,
  });
};

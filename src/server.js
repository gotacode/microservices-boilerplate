import express from 'express';
import routes from './api/routes/index.js';
import { initConfig } from './config/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './config/logger.js';
import ddTrace from 'dd-trace';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import registerService from './infrastructure/discovery/consul.js';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';

ddTrace.init();

const app = express();
initConfig();

// Middlewares recomendados
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { traceIdMiddleware } from './middlewares/traceId.js';
import { metricsMiddleware } from './middlewares/metrics.js';
app.use(traceIdMiddleware);
app.use(metricsMiddleware);
app.use(pinoHttp({ logger }));
app.use(compression());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

import { authenticate } from './middlewares/auth.js';
import { correlationIdMiddleware } from './middlewares/correlationId.js';
import { metricsMiddleware } from './middlewares/metrics.js';
app.use(correlationIdMiddleware);
app.use(metricsMiddleware);
app.use(authenticate);
app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (_, res) => res.status(200).send('OK'));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await registerService();
});

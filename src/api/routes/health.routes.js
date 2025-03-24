import { Router } from 'express';
import { healthController } from '../controllers/health.controller.js';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Healthcheck do serviço
 *     tags: [Infra]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', healthController);

export default router;

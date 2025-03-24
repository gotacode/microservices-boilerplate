import { authenticate } from '../../middlewares/auth.js';
import { Router } from 'express';
import { publishExampleController } from '../controllers/sns.controller.js';

const router = Router();
router.use(authenticate());

/**
 * @swagger
 * /api/sns/publish:
 *   post:
 *     summary: Publica uma mensagem no SNS
 *     tags: [SNS]
 *     responses:
 *       200:
 *         description: Mensagem publicada
 */
router.post('/publish', publishExampleController);

export default router;

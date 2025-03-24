import { validateExamplePayload } from '../validators/example.validator.js';
import { authenticate } from '../../middlewares/auth.js';
import { Router } from 'express';
import { getExampleController } from '../controllers/example.controller.js';

const router = Router();
router.use(authenticate());

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Retorna um exemplo
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/', getExampleController);

export default router;

import { validateExamplePayload } from '../validators/example.validator.js';
import { authenticate } from '../../middlewares/auth.js';
import { Router } from 'express';
import { getExampleController } from '../controllers/example.controller.js';

const router = Router();
router.use(authenticate());

/**
 * @swagger
 * /api/example/{id}:
 *   get:
 *     summary: Retorna um exemplo
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/:id', getExampleController);

export default router;

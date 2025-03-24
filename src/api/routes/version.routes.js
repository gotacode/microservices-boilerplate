import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /version:
 *   get:
 *     summary: Retorna a versão do boilerplate
 *     tags: [Infra]
 *     responses:
 *       200:
 *         description: Versão atual
 */
router.get('/', (req, res) => {
  res.json({ version: '1.0.0' });
});

export default router;

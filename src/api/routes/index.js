import { authenticate } from '../../middlewares/auth.js';
import healthRoutes from './health.routes.js';
import { Router } from 'express';
import exampleRoutes from './example.routes.js';

import snsRoutes from './sns.routes.js';
const router = Router();
router.use('/health', healthRoutes);
router.use(authenticate());
router.use('/example', exampleRoutes);
router.use('/sns', snsRoutes);

export default router;

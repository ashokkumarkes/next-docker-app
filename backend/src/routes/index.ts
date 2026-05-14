import { Router } from 'express';
import { userRoutes } from './user.routes';
import { tokenRoutes } from './token.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/token', tokenRoutes);

export { router as apiRoutes };

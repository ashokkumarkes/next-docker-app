import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(userController.getUsers));
router.post('/', asyncHandler(userController.postUser));

export { router as userRoutes };

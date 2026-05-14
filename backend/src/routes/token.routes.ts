import { Router } from 'express';
import * as tokenController from '../controllers/token.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(tokenController.createToken));

export { router as tokenRoutes };

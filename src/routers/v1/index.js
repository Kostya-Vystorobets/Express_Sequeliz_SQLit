import { Router } from 'express';
import userRouter from './user';
import movieRouter from './movie';
import sessionRouter from './session';

const router = Router();

router.use(userRouter);
router.use(movieRouter);
router.use(sessionRouter);

export default router;

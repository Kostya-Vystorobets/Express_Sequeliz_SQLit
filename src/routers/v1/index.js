import { Router } from 'express';
import userRouter from './user';
import movieRouter from './movie';
import sessionRouter from './session';
import tokenRouter from './token';
import logoutRouter from './logout';



const router = Router();

router.use(userRouter);
router.use(movieRouter);
router.use(sessionRouter);
router.use(tokenRouter);
router.use(logoutRouter);

export default router;

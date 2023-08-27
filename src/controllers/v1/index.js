import { Router } from 'express';
import userRouter from './user';
import movieRouter from './movie';
import loginRouter from './login';
import tokenRouter from './token';
import logoutRouter from './logout';

const router = Router();

router.use(userRouter);
router.use(movieRouter);
router.use(loginRouter);
router.use(tokenRouter);
router.use(logoutRouter);

export default router;

import { Router } from 'express';
import userRouter from './user';
import loginRouter from './login';
import tokenRouter from './token';
import logoutRouter from './logout';

const router = Router();

router.use(userRouter);
router.use(loginRouter);
router.use(tokenRouter);
router.use(logoutRouter);

export default router;

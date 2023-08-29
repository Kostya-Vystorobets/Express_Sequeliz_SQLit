import { Router } from 'express';
import userRouter from './user';
import movieRouter from './movie';
import sessionRouter from './session';
import importMoviesRouter from './importMovies';

const router = Router();

router.use(userRouter);
router.use(movieRouter);
router.use(sessionRouter);
router.use(importMoviesRouter);

export default router;

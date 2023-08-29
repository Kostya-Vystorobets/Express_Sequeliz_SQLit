import { Router } from 'express';
import usersController from '../../controllers/user';
import errorHandlerAsync from '../../middlewares/errorHandlerAsync';

const router = Router();

router.post('/users', errorHandlerAsync(usersController.registerUser));

export default router;


import { Router } from 'express';
import usersController from '../../controllers/user';
import errorHandlerAsync from '../../middlewares/errorHandlerAsync';
import validateUserData from '../../validations/user';

const router = Router();

router.post('/users', validateUserData, errorHandlerAsync(usersController.registerUser));

export default router;


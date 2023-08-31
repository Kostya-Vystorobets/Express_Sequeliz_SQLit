import { Router } from 'express';
import sessionController from '../../controllers/session';
import validateSessionData from '../../validations/session';

const router = Router();
router.post('/sessions', validateSessionData, sessionController.sessionUser);

export default router;

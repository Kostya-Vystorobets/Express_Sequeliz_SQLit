import { Router } from 'express';
import sessionController from '../../controllers/session';

const router = Router();
router.post('/sessions', sessionController.sessionUser);

export default router;

import { Router } from 'express';
import importMoviesController from '../../controllers/importMovies';
import requiresAuth from '../../middlewares/requiresAuth';

const router = Router();

router.post('/movies/import', requiresAuth(), upload.single('movies'), importMoviesController.importMovies);

export default router;

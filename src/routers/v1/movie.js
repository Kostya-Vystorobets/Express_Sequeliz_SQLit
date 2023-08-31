import { Router } from 'express';
import moviesController from '../../controllers/movie';
import requiresAuth from '../../middlewares/requiresAuth';
import { validateCreateMovieData, validateUpdateMovieData } from '../../validations/movie';


const router = Router();

router.post('/movies', validateCreateMovieData, requiresAuth(), moviesController.createMovie);
router.patch('/movies/:movieId', validateUpdateMovieData, requiresAuth(), moviesController.updateMovie);
router.get('/movies/:movieId', requiresAuth(), moviesController.getOneMovie);
router.get('/movies', requiresAuth(), moviesController.getListMovie);
router.delete('/movies/:movieId', requiresAuth(), moviesController.deleteMovie);

export default router;
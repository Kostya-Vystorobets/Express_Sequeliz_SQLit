import { Router } from 'express';
import moviesController from '../../controllers/movie';
import requiresAuth from '../../middlewares/requiresAuth';

const router = Router();

router.post('/movies', requiresAuth(), moviesController.createMovie);
router.put('/movies/:movieId', requiresAuth(), moviesController.updateMovie);
router.get('/movies/:movieId', requiresAuth(), moviesController.getOneMovie);
router.get('/movies', requiresAuth(), moviesController.getListMovie);
router.delete('/movies/:movieId', requiresAuth(), moviesController.deleteMovie);

export default router;

// import { Router } from 'express';
// import movieService from '../../services/movie';


// const router = Router();

// router.post(
//     '/movies',
//     async (req, res) => {
//         try {
//             const result = await movieService.createMovie(req.body);
//             res.status(201).send(result);
//         } catch (error) {
//             console.dirxml(error)
//             res.status(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     }
// );

// router.put(
//     '/movies/:movieId',
//     async (req, res) => {
//         const { movieId } = req.params;
//         try {
//             const result = await movieService.updateMovie(movieId, req.body);
//             res.status(200).send(result);
//         } catch (error) {
//             res.status(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     }
// );

// router.get(
//     '/movies/:movieId',
//     async (req, res) => {
//         const { movieId } = req.params;
//         try {
//             const result = await movieService.getOneMovie(movieId);
//             if (!result) {
//                 res.status(404).send({ success: false, message: 'Movie not found' });
//             } else {
//                 res.status(200).send(result);
//             }
//         } catch (error) {
//             res.status(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     }
// );

// router.get(
//     '/movies',
//     async (req, res) => {
//         try {
//             const result = await movieService.getListMovie();
//             res.status(200).send(result);
//         } catch (error) {
//             res.status(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     }
// );

// router.delete(
//     '/movies/:movieId',
//     async (req, res) => {
//         const { movieId } = req.params;
//         try {
//             const result = await movieService.deleteMovie(movieId);
//             res.status(200).send(result);
//         } catch (error) {
//             res.status(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     }
// );

// export default router;

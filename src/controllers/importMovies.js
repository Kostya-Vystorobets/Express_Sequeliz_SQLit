import importMoviesService from '../services/importMovies';
import { uploadFileMiddleware } from '../middlewares/uploadFile';



const importMoviesController = {
    async importMovies(req, res, next) {
        try {
            uploadFileMiddleware(req, res, async (error) => {
                if (error) {
                    return res.status(400).json({ success: false, message: 'File upload failed' });
                }

                const { buffer } = req.file;
                const fileContent = buffer.toString('utf8');

                const result = await importMoviesService.importMovies(fileContent);
                return res.status(200).send(result);
            });
        } catch (error) {
            next(error);
        }
    },
};

export default importMoviesController;

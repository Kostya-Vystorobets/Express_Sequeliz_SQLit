

import importMoviesService from '../services/importMovies';
import CustomHTTPError from '../errors/index';

const importMoviesController = {
    async importMovies(req, res, next) {
        try {

            const { file } = req.files;

            if (!file) {
                throw CustomHTTPError.BadRequest('File is required');
            }

            const result = await importMoviesService.importMoviesFromFile(file.path);

            res.status(200).send(result);
        } catch (error) {
            next(error);

        }
    },
};

export default importMoviesController;

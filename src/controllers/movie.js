import movieService from '../services/movie';

const moviesController = {
    async createMovie(req, res, next) {
        try {
            const result = await movieService.createMovie(req.body);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    },

    async updateMovie(req, res, next) {
        const { movieId } = req.params;
        try {
            const result = await movieService.updateMovie(movieId, req.body);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },

    async getOneMovie(req, res, next) {
        const { movieId } = req.params;
        try {
            const result = await movieService.getOneMovie(movieId);
            if (!result) {
                res.status(404).send({ success: false, message: 'Movie not found' });
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            next(error);
        }
    },

    async getListMovie(req, res, next) {
        try {
            const result = await movieService.getListMovie(req);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },

    async deleteMovie(req, res, next) {
        const { movieId } = req.params;
        try {
            const result = await movieService.deleteMovie(movieId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },
};

export default moviesController;

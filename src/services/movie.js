import models from '../models';

const { Movie, Actor } = models;

const movieService = {
    async createMovie(movieData) {
        const { title, year, format, actors } = movieData;
        return models.sequelize.transaction(async (transaction) => {
            const movie = await Movie.create(
                {
                    title,
                    year,
                    format,
                },
                { transaction }
            );

            if (actors && Array.isArray(actors)) {
                await movie.addActors(actors, { transaction });
            }

            return movie;
        });
    },
};

export default movieService;

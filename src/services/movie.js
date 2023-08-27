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
                const createdActors = [];

                for (const actorName of actors) {
                    let actor = await Actor.findOne({ where: { name: actorName } });

                    if (!actor) {
                        actor = await Actor.create({ name: actorName }, { transaction });
                    }

                    createdActors.push(actor);
                }

                await movie.addActors(createdActors, { transaction });
            }

            const movieWithActors = await Movie.findByPk(movie.id, {
                include: {
                    model: Actor,
                    attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                    through: { attributes: [] },
                },
                transaction,
            });

            const filteredMovie = {
                id: movieWithActors.id,
                title: movieWithActors.title,
                year: movieWithActors.year,
                format: movieWithActors.format,
                actors: movieWithActors.Actors,
                createdAt: movieWithActors.createdAt,
                updatedAt: movieWithActors.updatedAt,
            };

            return {
                data: filteredMovie,
                status: 1,
            };
        });
    },

    async updateMovie(movieId, movieData) {
        const { title, year, format, actors } = movieData;
        return models.sequelize.transaction(async (transaction) => {
            const movie = await Movie.findByPk(movieId, { transaction });
            if (!movie) {
                throw new Error('Movie not found');
            }

            await movie.update(
                {
                    title,
                    year,
                    format,
                },
                { transaction }
            );

            if (actors && Array.isArray(actors)) {
                await movie.setActors([], { transaction });
                await movie.addActors(actors, { transaction });
            }

            return movie;
        });
    },

    async getOneMovie(movieId) {
        const movie = await Movie.findByPk(movieId, {
            include: {
                model: Actor,
                attributes: ['id', 'name', "createdAt", "updatedAt"],
                through: { attributes: [] },
            },
        });

        if (!movie) {
            throw new Error('Movie not found');
        }

        return {
            data: {
                id: movie.id,
                title: movie.title,
                year: movie.year,
                format: movie.format,
                actors: movie.Actors,
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
            },
            status: 1,
        };
    },

    async getListMovie() {
        return Movie.findAll();
    },

    async deleteMovie(movieId) {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        await movie.destroy();
        return { success: true, message: 'Movie deleted' };
    },
};

export default movieService;

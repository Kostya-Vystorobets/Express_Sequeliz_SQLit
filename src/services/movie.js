import models from '../models';
import CustomHTTPError from '../errors/index';


const { Movie, Actor } = models;

const movieService = {
    async createMovie(movieData) {
        const { title, year, format, actors } = movieData;
        const existingMovie = await Movie.findOne({ where: { title } });
        if (existingMovie) {
            throw CustomHTTPError.BadRequest(`Movie with the specified name ${title} already exists.`);
        }
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
                const currentActors = await movie.getActors();

                const newActorNames = actors.filter((actorName) => {
                    return !currentActors.some((actor) => actor.name === actorName);
                });

                const actorsToAdd = [];
                const actorsToRemove = [];

                for (const actorName of newActorNames) {
                    let actor = await Actor.findOne({ where: { name: actorName } });

                    if (!actor) {
                        actor = await Actor.create({ name: actorName }, { transaction });
                    }

                    actorsToAdd.push(actor);
                }

                for (const actor of currentActors) {
                    if (!actors.includes(actor.name)) {
                        actorsToRemove.push(actor);
                    }
                }
                const associatedActors = await movie.getActors();

                await movie.removeActors(actorsToRemove, { transaction });
                await movie.addActors(actorsToAdd, { transaction });
                for (const actor of associatedActors) {
                    const actorMovies = await actor.getMovies();
                    if (actorMovies.length === 0) {
                        await actor.destroy();
                    }
                }
            }
            const movieWithActors = await Movie.findByPk(movie.id, {
                include: {
                    model: Actor,
                    attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                    through: { attributes: [] },
                },
                transaction,
            });

            return {
                data: {
                    id: movieWithActors.id,
                    title: movieWithActors.title,
                    year: movieWithActors.year,
                    format: movieWithActors.format,
                    actors: movieWithActors.Actors,
                    createdAt: movieWithActors.createdAt,
                    updatedAt: movieWithActors.updatedAt,
                },
                status: 1,
            };
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
        const movies = await Movie.findAll();
        const total = movies.length;
        return {
            data: movies,
            meta: { total },
            status: 1,
        };
    },

    async deleteMovie(movieId) {
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            throw new Error('Movie not found');
        }

        const associatedActors = await movie.getActors();

        await movie.setActors([]);

        await movie.destroy();

        for (const actor of associatedActors) {
            const actorMovies = await actor.getMovies();
            if (actorMovies.length === 0) {
                await actor.destroy();
            }
        }

        return { status: 1, };
    },

};

export default movieService;

import movieService from './movie';
import CustomHTTPError from '../errors/index';

const movieImportService = {
    async importMovies(fileContent) {
        try {
            const moviesData = this.parseMoviesData(fileContent);
            const savedMovies = [];

            for (const movieData of moviesData) {
                try {
                    const savedMovie = await movieService.createMovie(movieData);
                    savedMovies.push(savedMovie);
                } catch (error) {
                    if (error.message.includes('Movie with the specified name')) {
                        continue;
                    } else {
                    }
                }
            }
            const totalMovies = await movieService.getTotalMoviesCount();

            return {
                data: savedMovies.map(movie => ({
                    id: movie.data.id,
                    title: movie.data.title,
                    year: movie.data.year,
                    format: movie.data.format,
                    createdAt: movie.data.createdAt,
                    updatedAt: movie.data.updatedAt,
                })),
                meta: {
                    imported: savedMovies.length,
                    total: totalMovies,
                },
                status: 1,
            };
        } catch (error) {
            console.dirxml(error)
            throw new CustomHTTPError.BadRequest('Error importing movies');
        }
    },

    parseMoviesData(fileContent) {
        const movieDataArray = fileContent.split('\n\n');
        const movies = movieDataArray.map(movieDataStr => this.parseMovieData(movieDataStr)).filter(Boolean);
        return movies;
    },

    parseMovieData(movieDataStr) {
        const lines = movieDataStr.trim().split('\n');
        const movie = {
            title: '',
            year: 0,
            format: '',
            actors: [],
        };

        for (const line of lines) {
            const [key, value] = line.split(':').map(part => part.trim());

            if (key === 'Title') {
                movie.title = value;
            } else if (key === 'Release Year') {
                movie.year = parseInt(value);
            } else if (key === 'Format') {
                movie.format = value;
            } else if (key === 'Stars') {
                movie.actors = value.split(',').map(actor => actor.trim());
            }
        }

        if (movie.title && movie.year && movie.format && movie.actors.length > 0) {
            return movie;
        } else {
            return null;
        }
    },
};

export default movieImportService;

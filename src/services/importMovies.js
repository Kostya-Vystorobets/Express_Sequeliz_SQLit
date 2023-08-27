// movieImportService.js
import fs from 'fs';
import models from '../models'; // Підключіть ваші моделі

const { Movie } = models;

const movieImportService = {
    async importMoviesFromFile(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const moviesData = parseFileContent(fileContent);

            const importedMovies = [];

            for (const movieData of moviesData) {
                const movie = await Movie.create(movieData);
                importedMovies.push(movie);
            }

            return importedMovies;
        } catch (error) {
            throw new Error('Error importing movies');
        }
    },
};

function parseFileContent(content) {
    // Ваш код для розбору вмісту файлу та створення об'єктів фільмів
}

export default movieImportService;

# Movie Management System

This is a web application built using Node.js, Express.js, Sequelize ORM, and SQLite database. It allows users to store and manage information about movies, including their title, release year, format, and actors.

## Features

- User Authentication
- Add, Delete, and Retrieve Movies
- Display Movie Information
- Sort Movies Alphabetically
- Search Movies by Title
- Search Movies by Actor Name
- Import Movies from Text File

## Project Structure

The project is structured as follows:

project-directory/
|-- controllers/
| |-- authController.js
| |-- movieController.js
|-- models/
| |-- index.js
| |-- User.js
| |-- Movie.js
|-- routes/
| |-- authRoutes.js
| |-- movieRoutes.js
|-- uploads/
|-- app.js
|-- package.json
|-- sample_movies.txt
|-- README.md

## Getting Started

1. Install dependencies:

```
npm install

npm run build

node dist/server.js

```

The server will run at http://localhost:8000.

API Endpoints
Authentication:

POST /auth/register: Register a new user.
POST /auth/login: Log in with existing credentials.
Movie Management:

POST /movies: Add a new movie.
GET /movies: Get a list of all movies.
GET /movies/:id: Get details of a specific movie.
PUT /movies/:id: Update movie details.
DELETE /movies/:id: Delete a movie.
GET /movies/sort: Get movies sorted alphabetically by title.
GET /movies/search/:title: Search movies by title.
GET /movies/search/actor/:name: Search movies by actor name.
POST /movies/import: Import movies from a text file.
Contributing
Contributions are welcome! Please create a pull request for any enhancements or bug fixes.

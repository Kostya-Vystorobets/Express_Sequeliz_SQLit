# Movie Management System

This repository contains a web application developed using Node.js, Express.js, Sequelize ORM, and an SQLite database. The purpose of this application is to provide users with a platform to manage and store information about movies, including details such as title, release year, format, and actors.

## Features

- **User Authentication**: Secure user authentication system.
- **Add, Delete, and Retrieve Movies**: Users can perform CRUD (Create, Read, Update, Delete) operations on movies.
- **Display Movie Information**: Detailed information about movies is displayed.
- **Alphabetical Sorting**: Movies can be sorted alphabetically by title.
- **Search Functionality**: Users can search for movies by title or actor name.
- **Import Movies**: Ability to import movies from a text file.

## Project Structure

The project directory structure is organized as follows:

```
project-directory/
|-- src/
| |-- config/
| | |-- index.js
| | |-- database.js
| | |-- environment.js
| |-- controllers/
| | |-- session.js
| | |-- user.js
| | |-- movie.js
| | |-- importMovie.js
| |-- models/
| | |-- User.js
| | |-- Actor.js
| | |-- Movie.js
| |-- routes/
| | |-- index.js
| | |-- session.js
| | |-- user.js
| | |-- movie.js
| | |-- importMovie.js
| |-- services/
| | |-- index.js
| | |-- session.js
| | |-- user.js
| | |-- movie.js
| | |-- actor.js
| | |-- importMovie.js
| |-- middlewares/
| | |-- errorHandler.js
| | |-- errorHandlerAsync.js
| | |-- requiresAuth.js
| | |-- uploadFile.js
| |-- errors/
| | |-- index.js
| |-- utils/
| | |-- jwt-utils.js
| |-- app.js
| |-- server.js
|-- package.json
|-- README.md
```

## Getting Started

To get the project up and running, follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Build and run the project:

```bash
npm run build
node dist/server.js
```

The server will be accessible at http://localhost:8000.

## API Endpoints

### Authentication:

- `POST /api/v1/users`: Register a new user.
- `POST /api/v1/sessions`: Log in with existing credentials.

### Movie Management:

- `POST api/v1/movies`: Add a new movie.
- `GET /api/v1/movies`: Retrieve a list of all movies.
- `GET /api/v1/movies?actor=Humphrey&sort=year&order=DESC&limit=4&offset=2`: Get movies with options to filter by name or actor, sort by year or title, set order, limit results, and paginate. The endpoint supports searching for movies by title or actor name.
- `GET /api/v1/movies/:id`: Get details of a specific movie.
- `PATCH /api/v1/movies/:id`: Update movie details.
- `DELETE /api/v1/movies/:id`: Delete a movie.
- `POST api/v1/movies/import`: Import movies from a text file.

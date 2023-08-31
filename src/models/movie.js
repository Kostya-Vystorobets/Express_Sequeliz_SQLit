import { Model, DataTypes } from 'sequelize';

const validFormats = ['VHS', 'DVD', 'Blu-ray'];

export default (sequelize) => {
    class Movie extends Model {
        static associate(models) {
            Movie.belongsToMany(models.Actor, { through: 'MovieActors', foreignKey: 'movieId' });
        }

        static async createNewMovie({ title, year, format, actors }) {
            return sequelize.transaction(async (transaction) => {
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
        }
    }

    Movie.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Name is title',
                    },
                },
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Password is year',
                    },
                    isWithinRange(value) {
                        const currentYear = new Date().getFullYear();
                        if (value < 1850 || value > currentYear) {
                            throw new Error(`Year must be between 1850 and ${currentYear}`);
                        }
                    },
                },
            },
            format: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Password is format',
                    },
                    isIn: {
                        args: [validFormats],
                        msg: 'Invalid format',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'Movie',
        }
    );

    return Movie;
};

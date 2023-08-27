import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Movie extends Model {
        static associate(models) {
            Movie.belongsToMany(models.Actor, { through: 'MovieActors' });
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
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            format: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Movie',
        }
    );

    return Movie;
};

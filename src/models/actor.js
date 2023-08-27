import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Actor extends Model {
        static associate(models) {
            Actor.belongsToMany(models.Movie, { through: 'MovieActors' });
        }

        static async createNewActor({ name }) {
            return sequelize.transaction(async (transaction) => {
                return Actor.create({ name }, { transaction });
            });
        }
    }

    Actor.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Actor',
        }
    );

    return Actor;
};

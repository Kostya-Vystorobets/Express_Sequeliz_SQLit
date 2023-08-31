import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Actor extends Model {
        static associate(models) {
            Actor.belongsToMany(models.Movie, { through: 'MovieActors', foreignKey: 'actorId' });

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
                validate: {
                    notNull: {
                        msg: 'Name is required',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'Actor',
        }
    );

    return Actor;
};

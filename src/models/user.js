import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import environment from '../config/environment';

export default (sequelize) => {
    class User extends Model {

        static async hashPassword(password) {
            return bcrypt.hash(password, environment.saltRounds);
        }

        static async createNewUser({
            email,
            name,
            password,
        }) {
            return sequelize.transaction(() => {
                return User.create(
                    {
                        email,
                        name,
                        password,
                    }
                );
            });
        }
    }

    User.init(
        {
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Not a valid email address',
                    },
                    notNull: {
                        msg: 'Email is required',
                    },
                },
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Name is required',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Password is required',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
            defaultScope: { attributes: { exclude: ['password'] } },
            scopes: {
                withPassword: {
                    attributes: { include: ['password'] },
                },
            },
        }
    );

    User.prototype.comparePasswords = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    User.beforeSave(async (user, options) => {
        if (user.password) {
            const hashedPassword = await User.hashPassword(user.password);
            user.password = hashedPassword;
        }
    });

    User.afterCreate((user, options) => {
        delete user.dataValues.password;
    });

    return User;
};

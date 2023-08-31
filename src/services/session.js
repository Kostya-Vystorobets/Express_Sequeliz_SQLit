import models from '../models';
import JWTUtils from '../utils/jwt-utils';

const { User } = models;

const session = {
    async sessionUser(credentials) {
        const { email, password } = credentials;
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user) {
            return {
                status: 0,
                message: 'Invalid email or password',
            }

        } else if (!(await user.comparePasswords(password))) {
            return {
                status: 0,
                message: 'Invalid email or password',
            };
        }

        const payload = { email };
        const accessToken = JWTUtils.generateAccessToken(payload);

        return {
            token: accessToken,
            status: 1,
        };
    },
};

export default session;

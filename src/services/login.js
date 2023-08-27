import models from '../models';
import JWTUtils from '../utils/jwt-utils';

const { User, RefreshToken } = models;

const login = {
    async loginUser(credentials) {
        const { email, password } = credentials;
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user || !(await user.comparePasswords(password))) {
            return { success: false, message: 'Invalid credentials' };
        }

        const payload = { email };
        const accessToken = JWTUtils.generateAccessToken(payload);

        let refreshToken = await user.getRefreshToken();

        if (!refreshToken || !refreshToken.token) {
            refreshToken = JWTUtils.generateRefreshToken(payload);
            await RefreshToken.create({ token: refreshToken, userId: user.id });
        }

        return {
            success: true,
            message: 'Successfully logged in',
            data: {
                accessToken,
                refreshToken: refreshToken.token,
            },
        };
    },
};

export default login;

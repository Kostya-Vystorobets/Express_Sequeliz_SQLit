import models from '../models';
import JWTUtils from '../utils/jwt-utils';

const { User, RefreshToken } = models;

const token = {
    async generateAccessToken(jwtPayload) {
        const { email } = jwtPayload;
        const user = await User.findOne({
            where: { email },
            include: RefreshToken,
        });

        if (!user || !user.RefreshToken || !user.RefreshToken.token) {
            return { success: false, message: 'You must log in first' };
        }

        const payload = { email };
        const accessToken = JWTUtils.generateAccessToken(payload);

        return {
            success: true,
            data: {
                accessToken,
            },
        };
    },
};

export default token;

import models from '../models';
import JWTUtils from '../utils/jwt-utils';
import CustomHTTPError from '../errors/index';

const { User } = models;

const registerService = {
    async registerUser(userData) {
        const { email, name, password, confirmPassword } = userData;

        if (password !== confirmPassword) {
            throw CustomHTTPError.BadRequest('Passwords do not match');
        }

        const user = await User.findOne({ where: { email } });

        if (user) {
            throw CustomHTTPError.BadRequest('User with this email already exists');
        }

        const payload = { email };
        const accessToken = JWTUtils.generateAccessToken(payload);
        const refreshToken = JWTUtils.generateRefreshToken(payload);

        try {
            await User.createNewUser({ email, name, password, refreshToken });
            return {
                token: accessToken,
                status: 1,
            };
        } catch (error) {
            console.dirxml(error)
            throw new Error('User registration failed');
        }
    },
};

export default registerService;
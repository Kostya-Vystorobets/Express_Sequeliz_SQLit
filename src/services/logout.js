import models from '../models';

const { User, RefreshToken } = models;

const token = {
    async logoutUser(jwtPayload) {
        const { email } = jwtPayload;
        const user = await User.findOne({
            where: { email },
            include: RefreshToken,
        });

        if (!user || !user.RefreshToken) {
            return { success: false, message: 'User not found' };
        }

        user.RefreshToken.token = null;

        try {
            await user.RefreshToken.save();
            return { success: true, message: 'Successfully logged out' };
        } catch (error) {
            throw new Error('Logout failed');
        }
    },
};

export default token;
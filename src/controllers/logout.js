import logoutService from '../services/logout';

const logoutController = {
    async logoutUser(req, res, next) {
        try {
            const result = await logoutService.logoutUser(req.body);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },
};

export default logoutController;

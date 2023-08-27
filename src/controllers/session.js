import sessionService from '../services/session';

const loginController = {
    async sessionUser(req, res, next) {
        try {
            const result = await sessionService.sessionUser(req.body);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },
};

export default loginController;

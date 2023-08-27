import registerService from '../services/user';

const usersController = {
    async registerUser(req, res, next) {
        try {
            const result = await registerService.registerUser(req.body);
            res.status(200).send(result);

        } catch (error) {
            next(error);
        }
    },
};

export default usersController;
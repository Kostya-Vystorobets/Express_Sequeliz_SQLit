import loginService from '../services/login';

const loginController = {
    async loginUser(req, res, next) {
        try {
            const result = await loginService.loginUser(req.body);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },
};

export default loginController;

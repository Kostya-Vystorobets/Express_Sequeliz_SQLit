import tokenService from '../services/token';

const tokenController = {
    async generateAccessToken(req, res, next) {
        try {
            const result = await tokenService.generateAccessToken(req.body);
            res.status(result.success ? 200 : 401).send(result);
        } catch (error) {
            next(error);
        }
    },
};

export default tokenController;

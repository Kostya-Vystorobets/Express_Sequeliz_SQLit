import registerService from '../services/user';

const usersController = {
    async registerUser(req, res) {

        const result = await registerService.registerUser(req.body);
        res.status(200).send(result);

    },
};

export default usersController;
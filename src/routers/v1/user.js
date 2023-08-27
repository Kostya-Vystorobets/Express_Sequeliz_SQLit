import { Router } from 'express';
import usersController from '../../controllers/user';
import errorHandlerAsync from '../../middlewares/errorHandlerAsync';
import requiresAuth from '../../middlewares/requiresAuth';

const router = Router();

router.post('/users', errorHandlerAsync(usersController.registerUser));

export default router;





// import { Router } from 'express';
// import registerService from '../../services/user';

// const router = Router();
// router.post(
//     '/users',
//     async (req, res) => {
//         try {
//             const result = await registerService.registerUser(req.body);
//             res.status(200).send(result);
//         } catch (error) {
//             res.status(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     }
// );

// export default router;



// import { Router } from 'express';
// import models from '../../models';
// import asyncWrapper from '../../utils/asyncWrapper';
// import JWTUtils from '../../utils/jwt-utils';

// const router = Router();
// const { User } = models;

// router.post(
//     '/register',
//     asyncWrapper(async (req, res) => {
//         const { email } = req.body;
//         const user = await User.findOne({ where: { email } });

//         if (user) {
//             return res
//                 .status(200)
//                 .send({ success: false, message: 'User already exists' });
//         }

//         const payload = { email };
//         const accessToken = JWTUtils.generateAccessToken(payload);
//         const refreshToken = JWTUtils.generateRefreshToken(payload);
//         await User.createNewUser({ ...req.body, refreshToken });

//         return res.status(200).send({
//             success: true,
//             message: 'User successfully registered',
//             data: {
//                 accessToken,
//                 refreshToken,
//             },
//         });
//     })
// );

// export default router;
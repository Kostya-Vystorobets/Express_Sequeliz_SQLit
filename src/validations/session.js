import Joi from 'joi';
import CustomHTTPError from '../errors/index';

export default function validateSessionData(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
            'string.empty': 'Email field cannot be empty',
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password field cannot be empty',
        }),
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
        const errorMessages = validationResult.error.details.map((detail) => detail.message);
        return next(CustomHTTPError.BadRequest(errorMessages.join(', ')));
    }

    next();
}

import Joi from 'joi';
import CustomHTTPError from '../errors/index';

export default function validateUserData(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
            'string.empty': 'Email field cannot be empty',
        }),
        name: Joi.string().min(2).max(50).required().messages({
            'string.min': 'Name should be at least 2 characters',
            'string.max': 'Name should not exceed 50 characters',
            'any.required': 'Name is required',
            'string.empty': 'Name field cannot be empty',
        }),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.empty': 'Password field cannot be empty',
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
            }),
        confirmPassword: Joi.string()
            .required()
            .valid(Joi.ref('password'))
            .messages({
                'any.required': 'Confirm password is required',
                'any.only': 'Passwords do not match',
                'string.empty': 'Confirm password field cannot be empty',
            }),
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
        const errorMessages = validationResult.error.details.map((detail) => detail.message);
        return next(CustomHTTPError.BadRequest(errorMessages.join(', ')));
    }

    next();
}

import Joi from 'joi';
import CustomHTTPError from '../errors/index';

const validFormats = ['VHS', 'DVD', 'Blu-ray'];

export function validateCreateMovieData(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title field cannot be empty',
        }),
        year: Joi.number().integer().min(1850).max(new Date().getFullYear()).required().messages({
            'number.base': 'Year must be a valid number',
            'number.integer': 'Year must be an integer',
            'number.min': 'Year must be at least 1850',
            'number.max': `Year cannot exceed ${new Date().getFullYear()}`,
            'any.required': 'Year is required',
        }),
        format: Joi.string().valid(...validFormats).required().messages({
            'any.only': 'Invalid format',
            'any.required': 'Format is required',
        }),
        actors: Joi.array()
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
        const errorMessages = validationResult.error.details.map((detail) => detail.message);
        return next(CustomHTTPError.BadRequest(errorMessages.join(', ')));
    }

    next();
}

export function validateUpdateMovieData(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title field cannot be empty',
        }),
        year: Joi.number().integer().min(1850).max(new Date().getFullYear()).messages({
            'number.base': 'Year must be a valid number',
            'number.integer': 'Year must be an integer',
            'number.min': 'Year must be at least 1850',
            'number.max': `Year cannot exceed ${new Date().getFullYear()}`,
            'any.required': 'Year is required',
        }),
        format: Joi.string().valid(...validFormats).messages({
            'any.only': 'Invalid format',
            'any.required': 'Format is required',
        }),
        actors: Joi.array()
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
        const errorMessages = validationResult.error.details.map((detail) => detail.message);
        return next(CustomHTTPError.BadRequest(errorMessages.join(', ')));
    }

    next();
}

import Joi from 'joi';
import CustomHTTPError from '../errors/index';

export default function validateActorData(actorData) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required().messages({
            'any.required': 'Name field of an Actor is required',
            'string.min': 'Name  of an Actorshould be at least 2 characters',
            'string.max': 'Name of an Actor should not exceed 50 characters',
            'string.empty': 'Name field of an Actor cannot be empty',
        }),
    });

    const validationResult = schema.validate(actorData, { abortEarly: false });

    if (validationResult.error) {
        const errorMessages = validationResult.error.details.map((detail) => detail.message);
        throw CustomHTTPError.BadRequest(errorMessages.join(', '));
    }
}

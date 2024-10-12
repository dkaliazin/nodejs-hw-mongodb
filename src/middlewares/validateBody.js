import createHttpError from "http-errors";
import Joi from "joi";
export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        })
    } catch (err) {
        const error = createHttpError(400, 'Bad request', {
            errors: err.details,
        })
        next(error);
    }
}
export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().email(),
    email: Joi.string(),
    isFavorite: Joi.boolean(),
    contactType:Joi.string().valid('work','home','personal'),

})

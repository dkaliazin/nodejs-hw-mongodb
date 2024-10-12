/*import createHttpError from "http-errors";
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
}*/
import Joi from 'joi';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    next();
  };
};

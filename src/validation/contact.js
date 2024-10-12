import Joi from "joi";
export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().email().required(),
    email: Joi.string(),
    isFavorite: Joi.boolean(),
    contactType:Joi.string().valid('work','home','personal'),

})

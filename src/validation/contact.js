import Joi from "joi";
export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().email().required(),
    email: Joi.string(),
    isFavorite: Joi.boolean(),
    contactType:Joi.string().valid('work','home','personal'),

})
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(50).email(),
  phoneNumber: Joi.string().min(6).max(16),
  contactType: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
}).min(1);

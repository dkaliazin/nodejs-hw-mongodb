import Joi from "joi";
export const createContactSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    phoneNumber: Joi.string().pattern(/^[0-9\+\-\(\)]+$/).optional(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid('personal', 'business').optional()
});

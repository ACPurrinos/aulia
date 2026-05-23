import Joi from 'joi';

export const createUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(45)
        .required(),

    firstName: Joi.string()
        .trim()
        .max(45)
        .required(),

    lastName: Joi.string()
        .trim()
        .max(45)
        .required(),

    email: Joi.string()
        .email()
        .max(45)
        .required(),

    password: Joi.string()
        .min(3) // TO DO cambiar el mínimo para producción
        .required(),

    role: Joi.string()
        .required()
});


export const updateUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(45),

    firstName: Joi.string()
        .trim()
        .max(45),

    lastName: Joi.string()
        .trim()
        .max(45),

    email: Joi.string()
        .email()
        .max(45),

    password: Joi.string()
        .min(3), // TO DO cambiar el mínimo para producción

    role: Joi.string(),

    active: Joi.boolean()
}).min(1);
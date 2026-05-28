import Joi from 'joi';

export const loginSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(45)
        .required(),

    password: Joi.string()
        .min(3) // TO DO cambiar el mínimo para producción
        .required(),
});


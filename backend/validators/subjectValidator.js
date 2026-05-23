import Joi from 'joi';

export const createSubjectSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(45)
        .required()
});

export const updateSubjectSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(45),

    active: Joi.boolean()
}).min(1);
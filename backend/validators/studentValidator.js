import Joi from 'joi';

export const createStudentSchema = Joi.object({
    birthDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required(),

    familyConsent: Joi.boolean()
        .default(false),

    userId: Joi.number()
            .integer()
            .positive()
            .required(),

    courseId: Joi.number()
        .integer()
        .positive()
        .required(),
});


export const updateStudentSchema = Joi.object({
    birthDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),

    familyConsent: Joi.boolean(),

    userId: Joi.number()
            .integer()
            .positive(),

    courseId: Joi.number()
        .integer()
        .positive()
}).min(1);
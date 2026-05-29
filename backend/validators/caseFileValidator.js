import Joi from 'joi';

export const createCaseFileSchema = Joi.object({
    studentId: Joi.number()
        .integer()
        .positive()
        .required(),

    options: Joi.object({
            transaction: Joi.object()
            .optional()
            .allow(null),
            })
            .default({}) // Si no que sea un objeto vacío
});
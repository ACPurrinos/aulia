import Joi from 'joi';

export const createStudentSchema = Joi.object({
    birthDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required(),

    familyConsent: Joi.boolean()
        .default(false),

    courseId: Joi.number()
        .integer()
        .positive()
        .required(),    

    user: Joi.object({
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
    }).required(),
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
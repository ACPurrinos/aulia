import Joi from 'joi';

export const createTeacherSchema = Joi.object({
    academicYear: Joi.number()
        .integer()
        .min(2000)
        .max(2100) 
        .required(),

    courseId: Joi.number()
        .integer()
        .positive()
        .required(),

    teacherId: Joi.number()
        .integer()
        .positive()
        .required(),

    subjectId: Joi.number()
        .integer()
        .positive()
        .required()
});

export const updateTeacherSchema = Joi.object({
    academicYear: Joi.number()
        .integer()
        .min(2000)
        .max(2100),

    courseId: Joi.number()
        .integer()
        .positive(),

    teacherId: Joi.number()
        .integer()
        .positive(),

    subjectId: Joi.number()
        .integer()
        .positive()
}).min(1);
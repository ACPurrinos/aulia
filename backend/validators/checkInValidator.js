import Joi from 'joi';
import { EmotionalStates,CheckInContexts } from '../enums/checkinEnums.js';

export const createCheckInSchema = Joi.object({
    emotionalState: Joi.string()
        .trim()
        .valid(...Object.values(EmotionalStates))
        .required(),

    context: Joi.string()
        .trim()
        .valid(...Object.values(CheckInContexts))
        .allow(null, '') // es un atributo opcional
        .optional(),

    comment: Joi.string()
        .trim(),

    helpRequested: Joi.boolean()
        .default(false),

    studentId: Joi.number()
            .integer()
            .positive()
            .required(),
    
    courseId: Joi.number()
            .integer()
            .positive()
            .required()    
});

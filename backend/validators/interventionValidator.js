import Joi from 'joi';
import {InterventionTypes} from '../enums/interventionEnums.js';


export const createInterventionSchema = Joi.object({
    interventionDate:  Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required(),

    type: Joi.string()
        .trim()
        .valid(...Object.values(InterventionTypes))
        .required(),    
    
    title: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required(),

    description: Joi.string()
        .trim()
        .required(),

    summary: Joi.string()
        .trim(),

    outcome: Joi.string()
        .trim(),

    caseFileId: Joi.number()
        .integer()
        .positive() 
        .required(),

    professionalId: Joi.number()
        .integer()
        .positive()
        .required(),        
});
import Joi from 'joi';
import { ReferralActionEnum } from '../enums/index.js';


export const createReferralHistorySchema = Joi.object({
    referralId: Joi.number()
        .integer()
        .positive() 
        .required(),
    
    action: Joi.string()
        .trim()
        .valid(...Object.values(ReferralActionEnum))
        .required(), 

    notes: Joi.string()
        .trim(),

    changedBy: Joi.number()
        .integer()
        .positive()
        .required(),        
});
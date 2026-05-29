import Joi from 'joi';
import { ReferralStatusEnum, ReferralCategoriesEnum } from '../enums/index.js';

export const createReferralSchema = Joi.object({
    category: Joi.string()
        .trim()
        .valid(...Object.values(ReferralCategoriesEnum))
        .required(),
    
    storageKey: Joi.string()
        .trim()
        .required(),

    status: Joi.string()
        .trim()
        .valid(...Object.values(ReferralStatusEnum))
        .required(),

    caseFileId: Joi.number()
        .integer()
        .positive() 
        .required(),

    studentId: Joi.number()
        .integer()
        .positive() 
        .required(),

    referralId: Joi.number()
        .integer()
        .positive()
        .required(),    
        
    reviewedAt: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),

    reviewedBy: Joi.number()
        .integer()
        .positive()
        .required(),    
});

export const updateReferralSchema = Joi.object({
    notes: Joi.string()
        .trim() 
        .required() 
});

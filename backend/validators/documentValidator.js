import Joi from 'joi';
import {DocumentCategories} from '../enums/documentEnums.js';

export const createDocumentSchema = Joi.object({
    fileName: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .trim()
        .required(),

    originalName: Joi.string()
        .trim()
        .required(),

    mimeType: Joi.string()
        .trim()
        .required(),

    fileSize: Joi.number()
        .integer()
        .positive() 
        .required(),

    category: Joi.string()
        .trim()
        .valid(...Object.values(DocumentCategories))
        .required(),

    documentDate:  Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),

    caseFileId: Joi.number()
        .integer()
        .positive() 
        .required(),

    interventionId: Joi.number()
        .integer()
        .positive(),
        
    uploadedByUserId: Joi.number()
        .integer()
        .positive()
        .required(),
            
});

export const updateDocumentSchema = Joi.object({
    fileName: Joi.string()
        .trim()
        .min(3)
        .max(100),

    storageKey: Joi.string()
        .trim(),

    originalName: Joi.string()
        .trim(),

    mimeType: Joi.string()
        .trim(),

    fileSize: Joi.number()
        .integer()
        .positive(),

    category: Joi.string()
        .trim()
        .valid(...Object.values(DocumentCategories)),

    documentDate:  Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),

    caseFileId: Joi.number()
        .integer()
        .positive(),

    interventionId: Joi.number()
        .integer()
        .positive(),
        
    uploadedByUserId: Joi.number()
        .integer()
        .positive(),                
}).min(1);


import Joi from 'joi';


export const createReferralMessageSchema = Joi.object({
    referralId: Joi.number()
        .integer()
        .positive() 
        .required(),
    
    message: Joi.string()
        .trim()
        .required(),

    userId: Joi.number()
        .integer()
        .positive()
        .required(),        
});
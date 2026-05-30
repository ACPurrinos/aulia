import Joi from 'joi';
import { CourseLevels, SchoolGrades} from '../enums/courseEnums.js';


export const createCourseSchema = Joi.object({
    academicYear: Joi.number()
        .integer()
        .min(2000)
        .max(2100) 
        .required(),

    level: Joi.string()
        .trim()
        .valid(...Object.values(CourseLevels))
        .required(),
    
    grade: Joi.string()
        .trim()
        .valid(...Object.values(SchoolGrades))
        .required(),
    
    division: Joi.string()
        .trim()
        .required(),
});

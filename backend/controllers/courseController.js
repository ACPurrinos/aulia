import courseService from '../services/courseService.js';

const saveCourse = async(req,res)=>{
    try {
        const result = await courseService.saveCourse(req. body);
        res.status(201).json({message: result.message, course: result.course});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAllActiveCourses = async(req, res)=>{
    try {
        const { page } = req.query;
        const courses = await courseService.findAllActiveCourses();
        if(courses.length === 0){
            res.status(400).json({message: 'No courses found'});
        }else{
            res.status(200).json({courses});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findCourseById = async(req, res)=>{
    try {
        const id = req.params.id;
        const course = await courseService.findById(id);
        if(!course) return res.status(400).json({message: 'Course not found'});
        res.status(200).json({course});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findCourseWithTeachers = async(req, res)=>{
    try {
        const id = req.params.id;        
        const courses = await courseService.getCourseWithTeachers(id);
        if(!courses) {
            return res.status(400).json({message: 'No teachers found'});
        }
        res.status(200).json({courses});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findCourseWithStudents = async(req, res)=>{
    try {
        const id = req.params.id;
        const courses = await courseService.getCourseWithStudents(id);
        if(!courses) res.status(400).json({message: 'No students found'});
        res.status(200).json({courses});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const desactive = async(req, res)=>{
    try {
        const id = req.params.id;
        const deleted = await courseService.desactivate(id);
        if(!deleted){
            res.status(400).json({message: 'An error ocurred during delete'})
        }
        res.status(200).json( {message: 'Deleted sucessfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const courseController = {
    saveCourse,
    getAllActiveCourses,
    findCourseById,
    findCourseWithStudents,
    findCourseWithTeachers,
    desactive
}

export default courseController;
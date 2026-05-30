import CourseRepository from "../repositories/CourseRepository.js";

const saveCourse = async(data)=>{
    try {
        const course = {...data, active: true};
        const savedCourse = await CourseRepository.create(course);
        if(!savedCourse) throw new Error('An error ocurred during saving');
        return {message: 'Saved successfully', course: savedCourse};
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const findById = async(id)=>{
    try {
        const course = await CourseRepository.getById(id);
        return course;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const findAllActiveCourses = async()=>{
    try {
        const courses = await CourseRepository.getAllActive();
        return courses;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getCourseWithStudents = async(id)=>{
    try {
        const courses = await CourseRepository.getCourseWithStudents(id);
        return courses;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getCourseWithTeachers = async(id)=>{
    try {
        const courses = await CourseRepository.getCoursePlantaDocente(id);
        return courses;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const desactivate = async(id)=>{
    try {
        return await CourseRepository.desactivate(id);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const courseService = {
    saveCourse,
    findAllActiveCourses,
    findById,
    getCourseWithStudents,
    getCourseWithTeachers,
    desactivate
}

export default courseService;
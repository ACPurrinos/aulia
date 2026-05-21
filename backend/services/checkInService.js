import CheckInRepository from "../repositories/CheckInRepository.js";
import StudentRepository from "../repositories/StudentRepository.js";
import CourseRepository from "../repositories/CourseRepository.js"


const saveCheckIn = async(data)=>{
    try {
        const foundStudent = await StudentRepository.findStudentById(data.studentId);
        if(!foundStudent) throw new Error('Student not found');

        const courseFound = await CourseRepository.getById(data.courseId);
        if(!courseFound) throw new Error('Course not found');

        const savedCheckIn = await CheckInRepository.saveCheckIn(data);
        return {message: 'Saved successfully', checkIn: savedCheckIn};
    } catch (error) {
        throw new Error(error.message);
    }
}

const getDailySummary = async()=>{
    try {
        const summary = await CheckInRepository.getDailySummary();
        return summary;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUrgentHelperRequest = async()=>{
    try {
        const getHelperRequests = await CheckInRepository.getUrgentHelpRequests();
        return getHelperRequests;
    } catch (error) {
        throw new Error(error.message);
    }
}

const checkInservice = {
    saveCheckIn,
    getDailySummary,
    getUrgentHelperRequest
}

export default checkInservice;
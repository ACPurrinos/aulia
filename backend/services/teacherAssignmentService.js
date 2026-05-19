import TeacherAssignmentRepository from "../repositories/TeacherAssignmentRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import CourseRepository from "../repositories/CourseRepository.js"; 
import SubjectRepository from "../repositories/SubjectRepository.js";


const saveTeacherAssignment = async(data)=>{
    try {
        const userFound = await UserRepository.findUserById(data.teacherId);
        if(!userFound) throw new Error('User not found');

        const userCourse = await CourseRepository.getById(data.courseId);
        if(!userCourse) throw new Error('Course not found');

        const subjectFound = await SubjectRepository.findSubjectById(data.subjectId);
        if(!subjectFound) throw new Error('Subject not found');

        const assignment = await TeacherAssignmentRepository.saveTeacherAssignment(data);
        return {message: 'Saved sucessfully', assignment: assignment}
    } catch (error) {
        throw new Error(error.message);
    }
}

const findTeacherAssignmentbyId = async(id)=>{
    try {
        const foundAssignment = await TeacherAssignmentRepository.findTeacherAssignmentById(id);
        if(!foundAssignment) throw new Error('Teacher Assignment not found'); 
        return foundAssignment;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAllTeacherAssignment = async()=> {
    try {
        const assignments = await TeacherAssignmentRepository.findAllTeacherAssignments();
        if(assignments.length === 0) throw new Error('No teacher assignments found');
    return assignments;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findTeacherAssignmentbyUser = async(teacherId)=>{
    try {
        const foundAssignments = await TeacherAssignmentRepository.findTeacherAssignmentByUser(teacherId);
        if(foundAssignments.length === 0) throw new Error('This teacher has no assignments'); 
        return foundAssignments;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateTeacherAssignment = async(id, data)=>{
    try {
        const foundAssignment = await TeacherAssignmentRepository.findTeacherAssignmentById(id);
        if(!foundAssignment) throw new Error('Teacher Assignment not found'); 

        if(data.teacherId){
            const userFound = await UserRepository.findUserById(data.teacherId);
            if(!userFound) throw new Error('User not found');
        }

        if(data.courseId){
            const userCourse = await CourseRepository.getById(data.courseId);
            if(!userCourse) throw new Error('Course not found');
        }

        if(data.subjectId){
            const subjectFound = await SubjectRepository.findSubjectById(data.subjectId);
            if(!subjectFound) throw new Error('Subject not found');
        }
        const updatedAssignment = await TeacherAssignmentRepository.updateTeacherAssignment(id, data);
        if(!updatedAssignment) throw new Error('An error occurred during the update process');
        return {message: 'Updated successfully', assignment: updatedAssignment};
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteTeacherAssignment = async(id)=>{
    try {
        const foundAssignment = await TeacherAssignmentRepository.findTeacherAssignmentById(id);
        if(!foundAssignment) throw new Error('Teacher Assignment not found'); 

        const deletedAssignment = await TeacherAssignmentRepository.deleteTeacherAssignment(id);
        return deletedAssignment;
    } catch (error) {
        throw new Error(error.message);
    }
}

const teacherAssignment = {
    saveTeacherAssignment,
    findAllTeacherAssignment,
    findTeacherAssignmentbyId,
    findTeacherAssignmentbyUser,
    updateTeacherAssignment,
    deleteTeacherAssignment
}

export default teacherAssignment;
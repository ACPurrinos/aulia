import StudentRepository from '../repositories/StudentRepository.js'
import UserRepository from '../repositories/UserRepository.js';
import CourseRepository from '../repositories/CourseRepository.js'
import userService from '../services/userService.js';
import sequelize from '../data/db.js';

const createStudent = async (data) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const newUser = await userService.createUser(data.user, { transaction: t });
            const userId = newUser.user.id; 

            const courseFound = await CourseRepository.getById(data.courseId, { transaction: t });
            if (!courseFound) throw new Error('Course not found');

            const stu = {
                birthDate: data.birthDate,
                familyConsent: data.familyConsent,
                active: true,
                userId: userId, 
                courseId: data.courseId
            };

            const savedStudent = await StudentRepository.saveStudent(stu, { transaction: t });
            if (!savedStudent) throw new Error('Error while saving student');

            return {
                message: 'Student and User created successfully',
                user: newUser.user, 
                student: savedStudent
            };
        });

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findStudentById = async(id)=>{
    try {
        const foundStudent = await StudentRepository.findStudentById(id);
        if(!foundStudent) throw new Error('Student not found');

        return foundStudent;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findStudentByUserId = async(id)=>{
    try {
        const foundStudent = await StudentRepository.findStudentByUserId(id);
        if(!foundStudent) throw new Error('Student not found');

        return foundStudent;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAllStudents = async(page = 1)=>{
    try {
        const students = await StudentRepository.findAllStudents(page);
        return students;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAllStudentsByTeacher = async(id, page = 1)=>{
    try {
        const students = await StudentRepository.findAllStudentsByTeacher(id, page);
        return students;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findActiveStudents = async(page = 1)=>{
    try {
        const students = await StudentRepository.findAllStudents(page);
        return students;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateStudent = async(id, student)=>{
    try {
        const foundStudent = await StudentRepository.findStudentById(id);
        if(!foundStudent) throw new Error('Student not found');

        const updatedStudent = await StudentRepository.updateStudent(id, student);

        return {message: 'Student updated successfully', student: updatedStudent};
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteStudent = async(id)=>{
    try {
        const foundStudent = await StudentRepository.findStudentById(id);
        if(!foundStudent) throw new Error('Student not found');

        const deletedStudent = await StudentRepository.deleteStudent(id);
        return deletedStudent;
    } catch (error) {
        throw new Error(error.message);
    }
}

const studentService = {
    createStudent,
    findAllStudents,
    findAllStudentsByTeacher,
    findActiveStudents,
    findStudentById,
    findStudentByUserId,
    updateStudent,
    deleteStudent
}

export default studentService;
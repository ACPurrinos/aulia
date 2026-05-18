import Student from '../models/Student.js';
import StudentRepository from '../repositories/StudentRepository.js'
import UserRepository from '../repositories/UserRepository.js';


const createStudent = async(student)=>{
    try {
        const userFound = await UserRepository.findUserById(student.userId);
        if(!userFound) throw new Error('User not found');

        const studentFound = await StudentRepository.findStudentByIdUser(student.userId);
        if(studentFound) throw new Error('Student already exists');

        const stu = new Student({
            birthDate: student.birthDate,
            familyConsent: student.familyConsent,
            active: true,
            userId: userFound.id,
        });
        const savedStudent = await StudentRepository.saveStudent(stu);
        if(savedStudent){
            return {message: 'Student created successfully', user: savedStudent};
        }else{
            throw new Error('Error while saving user');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const findStudentById = async(id)=>{
    try {
        const foundStudent = await StudentRepository.findStudentById(id);
        if(!foundStudent) throw new Error('Student not found');

        return foundStudent;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAllStudents = async()=>{
    try {
        const students = await StudentRepository.findAllStudents();
        if(!students) throw new Error('There arent students');

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
    findStudentById,
    updateStudent,
    deleteStudent
}

export default studentService;
import StudentRepository from '../repositories/StudentRepository.js'
import UserRepository from '../repositories/UserRepository.js';
import CourseRepository from '../repositories/CourseRepository.js'


const createStudent = async(student)=>{
    try {
        const userFound = await UserRepository.findUserByIdWithRole(student.userId);
        if(!userFound) throw new Error('User not found');
        if(userFound.Role.name !== 'Alumno') throw new Error('This user is not a Student');

        const studentFound = await StudentRepository.findStudentByIdUser(student.userId);
        if(studentFound) throw new Error('Student already exists');

        const courseFound = await CourseRepository.getById(student.courseId);
        if(courseFound) throw new Error('Course not found');

        const stu = {
            birthDate: student.birthDate,
            familyConsent: student.familyConsent,
            active: true,
            userId: userFound.id,
            courseId: student.courseId
        };
        const savedStudent = await StudentRepository.saveStudent(stu);
        if(!savedStudent){
            throw new Error('Error while saving student');
        }
        return {message: 'Student created successfully', student: savedStudent};
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
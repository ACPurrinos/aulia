import TeacherAssignmentRepository from '../repositories/TeacherAssignmentRepository.js';
import teacherAssignmentService from '../services/teacherAssignmentService.js';

const saveTeacherAssignment = async(req, res)=>{
    try {
        const savedTeacher = await teacherAssignmentService.saveTeacherAssignment(req.body);
        res.status(201).json({message: savedTeacher.message, teacher: savedTeacher.assignment});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllTeacherAssignments = async(req, res)=>{
    try {
        const assignments = await teacherAssignmentService.findAllTeacherAssignment();
        if(assignments.length === 0){
            res.status(400).json({message: 'No Assigments found'})
        }
        res.status(200).json({assignments});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const findTeacherAssignmentById = async(req, res)=>{
    try {
        const id = req.params.id;
        const foundAssignment = await teacherAssignmentService.findTeacherAssignmentbyId(id);
        res.status(200).json({foundAssignment});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const findTeacherAssignmentByUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const foundAssignments = await teacherAssignmentService.findTeacherAssignmentbyUser(id);
        res.status(200).json({foundAssignments});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateTeacherAssignment = async(req, res)=>{
    try {
        
        const id = req.params.id;
        const updatedTeacher = await teacherAssignmentService.updateTeacherAssignment(id, req.body);
        res.status(200).json({message: updatedTeacher.message, assignment: updatedTeacher.assignment});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteTeacherAssignment = async(req, res)=>{
    try {
        const id = req.params.id;
        const deletedAssignment = await teacherAssignmentService.deleteTeacherAssignment(id);
        if (!deletedAssignment){
            return res.status(400).json({error: 'User not found'});
        }
        res.status(200).json( {message: 'Deleted sucessfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const teacherAssignmentController = {
    saveTeacherAssignment,
    getAllTeacherAssignments,
    findTeacherAssignmentById,
    findTeacherAssignmentByUser,
    updateTeacherAssignment,
    deleteTeacherAssignment
}

export default teacherAssignmentController;
import express from 'express';
const router = express.Router();
import teacherAssignmentController from '../controllers/teacherAssignmentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createTeacherSchema, updateTeacherSchema } from '../validators/teacherAssignmentValidator.js';


router.get('/findTeachers', teacherAssignmentController.getAllTeacherAssignments);
router.get('/findTeacher/:id', teacherAssignmentController.findTeacherAssignmentById);
router.get('/findByUser/:id', teacherAssignmentController.findTeacherAssignmentByUser);
router.post('/saveAssignment', validateRequest(createTeacherSchema), teacherAssignmentController.saveTeacherAssignment);
router.put('/updateAssignment/:id', validateRequest(updateTeacherSchema), teacherAssignmentController.updateTeacherAssignment);
router.delete('/deleteAssignment/:id', teacherAssignmentController.deleteTeacherAssignment);

export default router;
import express from 'express';
const router = express.Router();
import teacherAssignmentController from '../controllers/teacherAssignmentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createTeacherSchema, updateTeacherSchema } from '../validators/teacherAssignmentValidator.js';
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';


router.get('/findTeachers', verifyToken, authorize("Admin"), teacherAssignmentController.getAllTeacherAssignments);
router.get('/findTeacher/:id', verifyToken, authorize("Admin", "Docente"), teacherAssignmentController.findTeacherAssignmentById);
router.get('/findByUser/:id', verifyToken, authorize("Admin", "Docente"), teacherAssignmentController.findTeacherAssignmentByUser);
router.post('/saveAssignment', verifyToken, authorize("Admin"), validateRequest(createTeacherSchema), teacherAssignmentController.saveTeacherAssignment);
router.put('/updateAssignment/:id', verifyToken, authorize("Admin"), validateRequest(updateTeacherSchema), teacherAssignmentController.updateTeacherAssignment);
router.delete('/deleteAssignment/:id', verifyToken, authorize("Admin"), teacherAssignmentController.deleteTeacherAssignment);

export default router;
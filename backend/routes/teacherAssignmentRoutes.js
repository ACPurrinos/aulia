import express from 'express';
const router = express.Router();
import teacherAssignmentController from '../controllers/teacherAssignmentController.js';

router.get('/findTeachers', teacherAssignmentController.getAllTeacherAssignments);
router.get('/findById/:id', teacherAssignmentController.findTeacherAssignmentById);
router.get('/findByUser/:id', teacherAssignmentController.findTeacherAssignmentByUser);
router.post('/saveAssignment/', teacherAssignmentController.saveTeacherAssignment);
router.put('/updateAssignment/:id', teacherAssignmentController.updateTeacherAssignment);
router.delete('/deleteAssignment/:id', teacherAssignmentController.deleteTeacherAssignment);

export default router;
import express from 'express';
const router = express.Router();
import studentController from '../controllers/studentController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { createStudentSchema, updateStudentSchema } from '../validators/studentValidator.js';

router.get('/students', studentController.findAllStudents);
router.get('/activeStudents', studentController.findActiveStudents);
router.get('/studentsByTeacher/:id', studentController.findAllStudentsByTeacher);
router.get('/studentId/:id', studentController.findStudentById);
router.post('/saveStudent/', validateRequest(createStudentSchema), studentController.saveStudent);
router.put('/updateStudent/:id', validateRequest(updateStudentSchema), studentController.updateStudent);
router.delete('/deleteStudent/:id', studentController.deleteStudent);

export default router;